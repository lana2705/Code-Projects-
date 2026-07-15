'use client'

import { useState, useRef, useEffect } from 'react'
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

  const [errors, setErrors] = useState<{
    grossSalary?: string
    state?: string
    retirement401k?: string
  }>({})
  const [result, setResult] = useState<PaycheckResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Scroll the results into view after a successful calculation.
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  const handleCalculate = () => {
    const nextErrors: {
      grossSalary?: string
      state?: string
      retirement401k?: string
    } = {}
    const gross = parseCurrencyInput(grossSalary)
    if (!grossSalary.trim() || isNaN(gross) || gross <= 0) {
      nextErrors.grossSalary = 'Enter a gross salary greater than 0'
    }
    if (!state) {
      nextErrors.state = 'Select a state'
    }
    // 401(k) is a percentage of gross pay — reject anything outside 0–100.
    if (retirement401k.trim() !== '') {
      const pct = parseFloat(retirement401k)
      if (isNaN(pct) || pct < 0 || pct > 100) {
        nextErrors.retirement401k = 'Enter a percentage from 0 to 100'
      }
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setResult(null)
      return
    }

    setResult(
      calculatePaycheck({
        grossSalary: gross,
        payFrequency,
        filingStatus,
        state,
        retirement401kPercent: Math.min(
          Math.max(parseFloat(retirement401k) || 0, 0),
          100,
        ),
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
        {/* Fields flow left-to-right across a two-column grid. */}
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Gross salary (annual)</label>
            <CurrencyInput
              aria-label="Gross salary (annual)"
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
            <select
              aria-label="Pay frequency"
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
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
              aria-label="Filing status"
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
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
              aria-label="State"
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

          <div>
            <label className={labelClass}>401(k) contribution %</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                aria-label="401(k) contribution percent"
                placeholder="e.g. 5"
                value={retirement401k}
                onChange={(e) => setRetirement401k(e.target.value)}
                className={`${inputClass} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                %
              </span>
            </div>
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              Enter a percentage of your gross pay (e.g. 6 for 6%). Do not
              enter a dollar amount.
            </p>
            {errors.retirement401k && (
              <p className="mt-1 text-xs text-error">
                {errors.retirement401k}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Health insurance / paycheck</label>
            <CurrencyInput
              aria-label="Health insurance per paycheck"
              placeholder="$0.00"
              value={healthInsurance}
              onChange={setHealthInsurance}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Extra federal withholding / paycheck
            </label>
            <CurrencyInput
              aria-label="Extra federal withholding per paycheck"
              placeholder="$0.00"
              value={additionalWithholding}
              onChange={setAdditionalWithholding}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-all hover:bg-[#16264d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 active:scale-[0.98] active:bg-[#111f43]"
        >
          Calculate my take-home pay
        </button>
      </div>

      {result && (
        <div ref={resultsRef} className="scroll-mt-20">
          <hr className="my-6 border-0 border-t border-border" />
          <PaycheckResultsPanel result={result} />
        </div>
      )}
    </div>
  )
}
