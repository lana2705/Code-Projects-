'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import type { MortgageInputs, MortgageResult } from '@/types/calculator'
import {
  calculateMortgage,
  validateMortgageInputs,
} from '@/lib/calculators/mortgage'
import MortgageResultsPanel from './MortgageResultsPanel'
import CurrencyInput from '@/components/shared/CurrencyInput'
import { parseCurrencyInput } from '@/lib/format'

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'
const labelClass = 'mb-1 block text-sm font-medium text-navy'

const LOAN_TERMS = [30, 20, 15, 10]
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const now = new Date()
const YEAR_OPTIONS = [now.getFullYear(), now.getFullYear() + 1, now.getFullYear() + 2]

interface FieldErrors {
  homePrice?: string
  downPayment?: string
  annualInterestRate?: string
  annualPropertyTax?: string
  annualInsurance?: string
  monthlyHOA?: string
  pmiRate?: string
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('')
  const [downPaymentMode, setDownPaymentMode] = useState<'dollar' | 'percent'>(
    'dollar',
  )
  const [downPaymentInput, setDownPaymentInput] = useState('')
  const [loanTermYears, setLoanTermYears] = useState(30)
  const [annualInterestRate, setAnnualInterestRate] = useState('')
  const [startMonth, setStartMonth] = useState(now.getMonth())
  const [startYear, setStartYear] = useState(now.getFullYear())
  const [annualPropertyTax, setAnnualPropertyTax] = useState('')
  const [annualInsurance, setAnnualInsurance] = useState('')
  const [monthlyHOA, setMonthlyHOA] = useState('')
  const [pmiRate, setPmiRate] = useState('0.5')
  const [showPmiWhy, setShowPmiWhy] = useState(false)

  const [errors, setErrors] = useState<FieldErrors>({})
  const [result, setResult] = useState<MortgageResult | null>(null)
  const [inputsUsed, setInputsUsed] = useState<MortgageInputs | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  const homePriceNum = parseCurrencyInput(homePrice) || 0

  // Derived down payment in both units, live, so the PMI field can react
  // to the current down payment percentage as the user types.
  const downPaymentDollar = useMemo(() => {
    if (downPaymentMode === 'dollar') return parseCurrencyInput(downPaymentInput) || 0
    const pct = parseFloat(downPaymentInput) || 0
    return (pct / 100) * homePriceNum
  }, [downPaymentMode, downPaymentInput, homePriceNum])

  const downPaymentPercent = useMemo(() => {
    if (homePriceNum <= 0) return 0
    if (downPaymentMode === 'percent') return parseFloat(downPaymentInput) || 0
    return (downPaymentDollar / homePriceNum) * 100
  }, [downPaymentMode, downPaymentInput, downPaymentDollar, homePriceNum])

  const showPmiField = homePriceNum > 0 && downPaymentPercent < 20

  const toggleDownPaymentMode = () => {
    if (downPaymentMode === 'dollar') {
      // dollar -> percent
      const pct = homePriceNum > 0 ? (downPaymentDollar / homePriceNum) * 100 : 0
      setDownPaymentInput(pct ? pct.toFixed(2) : '')
      setDownPaymentMode('percent')
    } else {
      // percent -> dollar
      setDownPaymentInput(downPaymentDollar ? downPaymentDollar.toFixed(2) : '')
      setDownPaymentMode('dollar')
    }
  }

  const handleCalculate = () => {
    const startDate = new Date(startYear, startMonth, 1)
    const inputs: MortgageInputs = {
      homePrice: homePriceNum,
      downPayment: downPaymentDollar,
      loanTermYears,
      annualInterestRate: parseFloat(annualInterestRate),
      startDate,
      annualPropertyTax: parseCurrencyInput(annualPropertyTax) || 0,
      annualInsurance: parseCurrencyInput(annualInsurance) || 0,
      monthlyHOA: parseCurrencyInput(monthlyHOA) || 0,
      pmiRate: showPmiField ? (parseFloat(pmiRate) || 0) / 100 : 0,
    }

    const nextErrors: FieldErrors = {}
    if (!inputs.homePrice || inputs.homePrice <= 0) {
      nextErrors.homePrice = 'Home price must be greater than $0.'
    }
    if (inputs.downPayment < 0) {
      nextErrors.downPayment = 'Down payment cannot be negative.'
    } else if (inputs.homePrice > 0 && inputs.downPayment >= inputs.homePrice) {
      nextErrors.downPayment = 'Down payment cannot exceed the home price.'
    }
    if (
      isNaN(inputs.annualInterestRate) ||
      inputs.annualInterestRate < 0 ||
      inputs.annualInterestRate > 30
    ) {
      nextErrors.annualInterestRate = 'Please enter a rate between 0% and 30%.'
    }
    if ((inputs.annualPropertyTax ?? 0) < 0) {
      nextErrors.annualPropertyTax = 'Property tax cannot be negative.'
    }
    if ((inputs.annualInsurance ?? 0) < 0) {
      nextErrors.annualInsurance = 'Home insurance cannot be negative.'
    }
    if ((inputs.monthlyHOA ?? 0) < 0) {
      nextErrors.monthlyHOA = 'HOA fees cannot be negative.'
    }
    if (showPmiField && ((inputs.pmiRate ?? 0) < 0 || (inputs.pmiRate ?? 0) > 0.1)) {
      nextErrors.pmiRate = 'PMI rate must be between 0% and 10%.'
    }

    setErrors(nextErrors)
    if (
      Object.keys(nextErrors).length > 0 ||
      validateMortgageInputs(inputs).length > 0
    ) {
      setResult(null)
      setInputsUsed(null)
      return
    }

    setInputsUsed(inputs)
    setResult(calculateMortgage(inputs))
  }

  return (
    <div>
      <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
        <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-muted">
          Loan type: Conventional fixed-rate mortgage
        </span>

        <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {/* Column 1 — Loan details */}
          <div>
            <label className={labelClass}>Home price</label>
            <CurrencyInput
              aria-label="Home price"
              placeholder="$450,000.00"
              value={homePrice}
              onChange={setHomePrice}
              className={inputClass}
            />
            {errors.homePrice && (
              <p className="mt-1 text-xs text-error">{errors.homePrice}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className={labelClass}>Down payment</label>
              <div className="mb-1 flex overflow-hidden rounded-input border border-border text-xs">
                <button
                  type="button"
                  onClick={() =>
                    downPaymentMode !== 'dollar' && toggleDownPaymentMode()
                  }
                  className={`px-2 py-0.5 ${
                    downPaymentMode === 'dollar'
                      ? 'bg-navy text-white'
                      : 'bg-white text-muted'
                  }`}
                >
                  $
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downPaymentMode !== 'percent' && toggleDownPaymentMode()
                  }
                  className={`px-2 py-0.5 ${
                    downPaymentMode === 'percent'
                      ? 'bg-navy text-white'
                      : 'bg-white text-muted'
                  }`}
                >
                  %
                </button>
              </div>
            </div>
            {downPaymentMode === 'dollar' ? (
              <CurrencyInput
                aria-label="Down payment in dollars"
                placeholder="$90,000.00"
                value={downPaymentInput}
                onChange={setDownPaymentInput}
                className={inputClass}
              />
            ) : (
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  aria-label="Down payment percent"
                  placeholder="e.g. 20"
                  value={downPaymentInput}
                  onChange={(e) => setDownPaymentInput(e.target.value)}
                  className={`${inputClass} pr-8`}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                  %
                </span>
              </div>
            )}
            {errors.downPayment && (
              <p className="mt-1 text-xs text-error">{errors.downPayment}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Loan term</label>
            <select
              aria-label="Loan term"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              className={inputClass}
            >
              {LOAN_TERMS.map((years) => (
                <option key={years} value={years}>
                  {years} years
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Interest rate (APR)</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                aria-label="Interest rate (APR) percent"
                placeholder="e.g. 6.5"
                value={annualInterestRate}
                onChange={(e) => setAnnualInterestRate(e.target.value)}
                className={`${inputClass} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                %
              </span>
            </div>
            {errors.annualInterestRate && (
              <p className="mt-1 text-xs text-error">
                {errors.annualInterestRate}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>
              Start date (first mortgage payment)
            </label>
            <div className="grid grid-cols-2 gap-3 sm:max-w-xs">
              <select
                aria-label="Start month"
                value={startMonth}
                onChange={(e) => setStartMonth(Number(e.target.value))}
                className={inputClass}
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                aria-label="Start year"
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                className={inputClass}
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Column 2 — Monthly costs (optional) */}
          <div>
            <label className={labelClass}>Property tax (annual)</label>
            <CurrencyInput
              aria-label="Property tax (annual)"
              placeholder="$0.00"
              value={annualPropertyTax}
              onChange={setAnnualPropertyTax}
              className={inputClass}
            />
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              Find on your county assessor&apos;s website.
            </p>
            {errors.annualPropertyTax && (
              <p className="mt-1 text-xs text-error">
                {errors.annualPropertyTax}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Home insurance (annual)</label>
            <CurrencyInput
              aria-label="Home insurance (annual)"
              placeholder="$0.00"
              value={annualInsurance}
              onChange={setAnnualInsurance}
              className={inputClass}
            />
            {errors.annualInsurance && (
              <p className="mt-1 text-xs text-error">
                {errors.annualInsurance}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>HOA fees (monthly)</label>
            <CurrencyInput
              aria-label="HOA fees (monthly)"
              placeholder="$0.00"
              value={monthlyHOA}
              onChange={setMonthlyHOA}
              className={inputClass}
            />
            {errors.monthlyHOA && (
              <p className="mt-1 text-xs text-error">{errors.monthlyHOA}</p>
            )}
          </div>

          {showPmiField && (
            <div>
              <label className={labelClass}>Estimated PMI rate</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  aria-label="Estimated PMI rate percent"
                  placeholder="0.5"
                  value={pmiRate}
                  onChange={(e) => setPmiRate(e.target.value)}
                  className={`${inputClass} pr-8`}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                  %
                </span>
              </div>
              <p className="mt-1 text-xs italic text-[#9CA3AF]">
                Actual PMI rates vary based on credit score, down payment,
                and loan characteristics. 0.5% is a common starting
                estimate.{' '}
                <button
                  type="button"
                  onClick={() => setShowPmiWhy((v) => !v)}
                  className="underline"
                >
                  Why?
                </button>
              </p>
              {showPmiWhy && (
                <p className="mt-1 text-xs italic text-[#9CA3AF]">
                  PMI pricing depends on your LTV ratio, credit score, loan
                  amount, and the insurer. Your lender will give you the
                  actual rate.
                </p>
              )}
              {errors.pmiRate && (
                <p className="mt-1 text-xs text-error">{errors.pmiRate}</p>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-all hover:bg-[#16264d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 active:scale-[0.98] active:bg-[#111f43]"
        >
          Calculate my mortgage payment
        </button>
      </div>

      {result && inputsUsed && (
        <div ref={resultsRef} className="scroll-mt-20">
          <hr className="my-6 border-0 border-t border-border" />
          <MortgageResultsPanel result={result} inputs={inputsUsed} />
        </div>
      )}
    </div>
  )
}
