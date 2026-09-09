'use client'

import { useState, useRef, useEffect } from 'react'
import type { BudgetResult } from '@/types/calculator'
import { calculateBudget } from '@/lib/calculators/budget'
import BudgetResultsPanel from './BudgetResultsPanel'
import CurrencyInput from '@/components/shared/CurrencyInput'
import { parseCurrencyInput } from '@/lib/format'

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'
const labelClass = 'mb-1 block text-sm font-medium text-navy'

export default function BudgetCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [result, setResult] = useState<BudgetResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  const handleCalculate = () => {
    const income = parseCurrencyInput(monthlyIncome)
    if (!monthlyIncome.trim() || isNaN(income) || income <= 0) {
      setError('Enter a monthly take-home pay greater than 0')
      setResult(null)
      return
    }
    setError(undefined)
    setResult(calculateBudget(income))
  }

  return (
    <div>
      <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
        <div className="max-w-sm">
          <label className={labelClass}>Monthly take-home pay</label>
          <CurrencyInput
            aria-label="Monthly take-home pay"
            placeholder="$4,500.00"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            className={inputClass}
          />
          {error && <p className="mt-1 text-xs text-error">{error}</p>}
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-all hover:bg-[#16264d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 active:scale-[0.98] active:bg-[#111f43]"
        >
          Calculate my budget
        </button>
      </div>

      {result && (
        <div ref={resultsRef} className="scroll-mt-20">
          <hr className="my-6 border-0 border-t border-border" />
          <BudgetResultsPanel result={result} />
        </div>
      )}
    </div>
  )
}
