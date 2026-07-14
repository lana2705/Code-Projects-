'use client'

import { useState, useRef, useEffect } from 'react'
import { Trash2, Plus } from 'lucide-react'
import type { Debt } from '@/types/calculator'
import {
  comparePayoffMethods,
  debtsWithInsufficientMinimum,
  type DebtComparison,
} from '@/lib/calculators/debtPayoff'
import DebtResultsPanel from './DebtResultsPanel'
import CurrencyInput from '@/components/shared/CurrencyInput'
import { parseCurrencyInput } from '@/lib/format'

interface DebtRow {
  id: string
  name: string
  balance: string
  apr: string
  minimumPayment: string
}

interface RowErrors {
  name?: string
  balance?: string
  apr?: string
  minimumPayment?: string
}

const MAX_DEBTS = 10

function newRow(): DebtRow {
  return {
    id: crypto.randomUUID(),
    name: '',
    balance: '',
    apr: '',
    minimumPayment: '',
  }
}

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'

export default function DebtPayoffCalculator() {
  const [rows, setRows] = useState<DebtRow[]>([newRow()])
  const [extraPayment, setExtraPayment] = useState('0')
  const [errors, setErrors] = useState<Record<string, RowErrors>>({})
  const [warnings, setWarnings] = useState<string[]>([])
  const [comparison, setComparison] = useState<DebtComparison | null>(null)
  const [debts, setDebts] = useState<Debt[]>([])
  const resultsRef = useRef<HTMLDivElement>(null)

  // Scroll the results into view after a successful calculation.
  useEffect(() => {
    if (comparison && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [comparison])

  const updateRow = (id: string, field: keyof DebtRow, value: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    )
  }

  const addRow = () => {
    if (rows.length >= MAX_DEBTS) return
    setRows((prev) => [...prev, newRow()])
  }

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev))
  }

  const validate = (): { valid: boolean; parsed: Debt[] } => {
    const nextErrors: Record<string, RowErrors> = {}
    const parsed: Debt[] = []

    rows.forEach((r) => {
      const rowErrors: RowErrors = {}
      const balance = parseCurrencyInput(r.balance)
      const apr = parseFloat(r.apr)
      const minimumPayment = parseCurrencyInput(r.minimumPayment)

      if (!r.name.trim()) rowErrors.name = 'Required'
      if (!r.balance.trim() || isNaN(balance) || balance <= 0)
        rowErrors.balance = 'Enter a balance greater than 0'
      if (r.apr.trim() === '' || isNaN(apr) || apr < 0 || apr > 100)
        rowErrors.apr = 'Enter an APR from 0 to 100'
      if (
        !r.minimumPayment.trim() ||
        isNaN(minimumPayment) ||
        minimumPayment <= 0
      )
        rowErrors.minimumPayment = 'Enter a payment greater than 0'

      if (Object.keys(rowErrors).length > 0) {
        nextErrors[r.id] = rowErrors
      } else {
        parsed.push({
          id: r.id,
          name: r.name.trim(),
          balance,
          apr,
          minimumPayment,
        })
      }
    })

    setErrors(nextErrors)
    return { valid: Object.keys(nextErrors).length === 0, parsed }
  }

  const handleCalculate = () => {
    const { valid, parsed } = validate()
    if (!valid) {
      setComparison(null)
      setWarnings([])
      return
    }

    setWarnings(debtsWithInsufficientMinimum(parsed))

    const extra = Math.max(0, parseCurrencyInput(extraPayment) || 0)
    const result = comparePayoffMethods(parsed, extra)
    setDebts(parsed)
    setComparison(result)
  }

  return (
    <div>
      <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
        {/* Column headers (desktop) */}
        <div className="mb-2 hidden gap-3 text-xs font-medium text-muted sm:grid sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_auto]">
          <span>Debt name</span>
          <span>Balance</span>
          <span>APR %</span>
          <span>Min. payment</span>
          <span className="w-8" />
        </div>

        <div className="space-y-4">
          {rows.map((row) => {
            const e = errors[row.id] ?? {}
            return (
              <div
                key={row.id}
                className="grid gap-3 sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_auto] sm:items-start"
              >
                <div>
                  <label className="mb-1 block text-xs text-muted sm:hidden">
                    Debt name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chase Visa"
                    value={row.name}
                    onChange={(ev) =>
                      updateRow(row.id, 'name', ev.target.value)
                    }
                    className={inputClass}
                  />
                  {e.name && (
                    <p className="mt-1 text-xs text-error">{e.name}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted sm:hidden">
                    Balance
                  </label>
                  <CurrencyInput
                    aria-label="Balance"
                    placeholder="$0.00"
                    value={row.balance}
                    onChange={(v) => updateRow(row.id, 'balance', v)}
                    className={inputClass}
                  />
                  {e.balance && (
                    <p className="mt-1 text-xs text-error">{e.balance}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted sm:hidden">
                    APR %
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={row.apr}
                    onChange={(ev) => updateRow(row.id, 'apr', ev.target.value)}
                    className={inputClass}
                  />
                  {e.apr && <p className="mt-1 text-xs text-error">{e.apr}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted sm:hidden">
                    Min. payment
                  </label>
                  <CurrencyInput
                    aria-label="Minimum payment"
                    placeholder="$0.00"
                    value={row.minimumPayment}
                    onChange={(v) => updateRow(row.id, 'minimumPayment', v)}
                    className={inputClass}
                  />
                  {e.minimumPayment && (
                    <p className="mt-1 text-xs text-error">
                      {e.minimumPayment}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length <= 1}
                  aria-label="Remove debt"
                  className="flex h-[38px] w-9 items-center justify-center rounded-input text-muted transition-colors hover:text-error disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={addRow}
          disabled={rows.length >= MAX_DEBTS}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} /> Add another debt
        </button>

        <div className="mt-6 max-w-xs">
          <label className="mb-1 block text-sm font-medium text-navy">
            Extra monthly payment (optional)
          </label>
          <CurrencyInput
            aria-label="Extra monthly payment"
            placeholder="$0.00"
            value={extraPayment}
            onChange={(v) => setExtraPayment(v)}
            className={inputClass}
          />
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-all hover:bg-[#16264d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 active:scale-[0.98] active:bg-[#111f43] sm:w-auto"
        >
          Calculate my payoff plan
        </button>
      </div>

      {warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {warnings.map((name) => (
            <div
              key={name}
              className="rounded-input border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
            >
              Your minimum payment doesn&apos;t cover the interest on {name}.
              Increase it to make progress.
            </div>
          ))}
        </div>
      )}

      {comparison && (
        <div ref={resultsRef} className="scroll-mt-20">
          <DebtResultsPanel comparison={comparison} debts={debts} />
        </div>
      )}
    </div>
  )
}
