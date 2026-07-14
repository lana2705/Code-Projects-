'use client'

import { useState } from 'react'
import type {
  FilingStatus,
  PayFrequency,
  PaycheckResult,
} from '@/types/calculator'
import { calculatePaycheck } from '@/lib/calculators/paycheck'
import { STATES_ALPHABETICAL } from '@/lib/calculators/stateTaxRates'
import PaycheckResultsPanel from './PaycheckResultsPanel'
import CurrencyInput from '@/components/shared/CurrencyInput'
import { parseCurrencyInput } from '@/lib/format'

const FREQUENCIES: { value: PayFrequency; label: string }[] = [
  { value: 'annual', label: 'Annual' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'weekly', label: 'Weekly' },
]

const FILING_STATUSES: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'married_jointly', label: 'Married filing jointly' },
  { value: 'married_separately', label: 'Married filing separately' },
  { value: 'head_of_household', label: 'Head of household' },
]

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'
const labelClass = 'mb-1 block text-sm font-medium text-navy'

export default function PaycheckCalculator() {
  const [grossSalary, setGrossSalary] = useState('')
  const [payFrequency, setPayFrequency] = useState<PayFrequency>('biweekly')
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [state, setState] = useState('')
  const [retirement401k, setRetirement401k] = useState('')
  const [healthInsurance, setHealthInsurance] = useState('')
  const [additionalWithholding, setAdditionalWithholding] = useState('')

  const [errors, setErrors] = useState<{ grossSalary?: string; state?: string }>(
    {},
  )
  const [result, setResult] = useState<PaycheckResult | null>(null)

  const handleCalculate = () => {
    const nextErrors: { grossSalary?: string; state?: string } = {}
    const gross = parseCurrencyInput(grossSalary)
    if (!grossSalary.trim() || isNaN(gross) || gross <= 0) {
      nextErrors.grossSalary = 'Enter a gross salary greater than 0'
    }
    if (!state) {
      nextErrors.state = 'Select a state'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setResult(null)
      return
    }

    const clamp = (v: string, min: number, max: number) => {
      const n = parseFloat(v)
      if (isNaN(n)) return 0
      return Math.min(Math.max(n, min), max)
    }

    setResult(
      calculatePaycheck({
        grossSalary: gross,
        payFrequency,
        filingStatus,
        state,
        retirement401kPercent: clamp(retirement401k, 0, 100),
        healthInsurancePerPeriod: Math.max(
          0,
          parseCurrencyInput(healthInsurance) || 0,
        ),
        additionalWithholdingPerPeriod: Math.max(
          0,
          parseCurrencyInput(additionalWithholding) || 0,
        ),
      }),
    )
  }

  return (
    <div>
      <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Column 1: Income */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-navy">Income</h3>
            <div>
              <label className={labelClass}>Annual gross salary</label>
              <CurrencyInput
                aria-label="Annual gross salary"
                placeholder="$60,000.00"
                value={grossSalary}
                onChange={setGrossSalary}
                className={inputClass}
              />
              {errors.grossSalary && (
                <p className="mt-1 text-xs text-error">{errors.grossSalary}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Pay frequency</label>
              <p className="sr-only">How often you are paid</p>
              <select
                value={payFrequency}
                onChange={(e) =>
                  setPayFrequency(e.target.value as PayFrequency)
                }
                className={inputClass}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Filing status</label>
              <select
                value={filingStatus}
                onChange={(e) =>
                  setFilingStatus(e.target.value as FilingStatus)
                }
                className={inputClass}
              >
                {FILING_STATUSES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={inputClass}
              >
                <option value="">Select a state…</option>
                {STATES_ALPHABETICAL.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-xs text-error">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Column 2: Deductions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-navy">
              Deductions{' '}
              <span className="text-sm font-normal text-muted">
                (optional)
              </span>
            </h3>
            <div>
              <label className={labelClass}>401(k) contribution %</label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={retirement401k}
                onChange={(e) => setRetirement401k(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Health insurance premium per paycheck
              </label>
              <CurrencyInput
                aria-label="Health insurance premium per paycheck"
                placeholder="$0.00"
                value={healthInsurance}
                onChange={setHealthInsurance}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Additional federal withholding per paycheck
              </label>
              <CurrencyInput
                aria-label="Additional federal withholding per paycheck"
                placeholder="$0.00"
                value={additionalWithholding}
                onChange={setAdditionalWithholding}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#16264d]"
        >
          Calculate my take-home pay
        </button>
      </div>

      {result && <PaycheckResultsPanel result={result} />}
    </div>
  )
}
