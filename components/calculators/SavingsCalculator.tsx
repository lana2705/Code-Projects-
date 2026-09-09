'use client'

import { useState, useRef, useEffect } from 'react'
import type { SavingsResult } from '@/types/calculator'
import { calculateSavings } from '@/lib/calculators/savings'
import SavingsResultsPanel from './SavingsResultsPanel'
import CurrencyInput from '@/components/shared/CurrencyInput'
import { parseCurrencyInput } from '@/lib/format'

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'
const labelClass = 'mb-1 block text-sm font-medium text-navy'

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [years, setYears] = useState('')

  const [errors, setErrors] = useState<{
    initialDeposit?: string
    annualRate?: string
    years?: string
  }>({})
  const [result, setResult] = useState<SavingsResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  const handleCalculate = () => {
    const nextErrors: {
      initialDeposit?: string
      annualRate?: string
      years?: string
    } = {}
    const deposit = parseCurrencyInput(initialDeposit || '0')
    const rate = parseFloat(annualRate)
    const yearsNum = parseFloat(years)

    if (initialDeposit.trim() !== '' && (isNaN(deposit) || deposit < 0)) {
      nextErrors.initialDeposit = 'Enter a valid starting amount'
    }
    if (annualRate.trim() === '' || isNaN(rate) || rate < 0 || rate > 100) {
      nextErrors.annualRate = 'Enter an interest rate from 0 to 100'
    }
    if (years.trim() === '' || isNaN(yearsNum) || yearsNum <= 0 || yearsNum > 60) {
      nextErrors.years = 'Enter a number of years from 1 to 60'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setResult(null)
      return
    }

    setResult(
      calculateSavings({
        initialDeposit: Math.max(0, deposit || 0),
        monthlyContribution: Math.max(
          0,
          parseCurrencyInput(monthlyContribution) || 0,
        ),
        annualRate: rate,
        years: yearsNum,
      }),
    )
  }

  return (
    <div>
      <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Starting balance</label>
            <CurrencyInput
              aria-label="Starting balance"
              placeholder="$1,000.00"
              value={initialDeposit}
              onChange={setInitialDeposit}
              className={inputClass}
            />
            {errors.initialDeposit && (
              <p className="mt-1 text-xs text-error">
                {errors.initialDeposit}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Monthly contribution</label>
            <CurrencyInput
              aria-label="Monthly contribution"
              placeholder="$200.00"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Annual interest rate</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                aria-label="Annual interest rate percent"
                placeholder="e.g. 4.5"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                className={`${inputClass} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                %
              </span>
            </div>
            {errors.annualRate && (
              <p className="mt-1 text-xs text-error">{errors.annualRate}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Number of years</label>
            <input
              type="number"
              inputMode="decimal"
              aria-label="Number of years"
              placeholder="e.g. 10"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={inputClass}
            />
            {errors.years && (
              <p className="mt-1 text-xs text-error">{errors.years}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-all hover:bg-[#16264d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 active:scale-[0.98] active:bg-[#111f43]"
        >
          Calculate my savings growth
        </button>
      </div>

      {result && (
        <div ref={resultsRef} className="scroll-mt-20">
          <hr className="my-6 border-0 border-t border-border" />
          <SavingsResultsPanel result={result} />
        </div>
      )}
    </div>
  )
}
