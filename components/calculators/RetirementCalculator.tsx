'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import type { RetirementInputs, RetirementResult } from '@/types/calculator'
import {
  calculateRetirement,
  validateRetirementInputs,
} from '@/lib/calculators/retirement'
import RetirementResultsPanel from './RetirementResultsPanel'
import CurrencyInput from '@/components/shared/CurrencyInput'
import { parseCurrencyInput } from '@/lib/format'

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'
const labelClass = 'mb-1 block text-sm font-medium text-navy'

interface FieldErrors {
  currentAge?: string
  retirementAge?: string
  currentSavings?: string
  annualIncome?: string
  monthlyContribution?: string
  employerMatchRate?: string
  expectedAnnualReturn?: string
  inflationRate?: string
  desiredMonthlyIncome?: string
  socialSecurityMonthly?: string
  yearsOfRetirement?: string
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('')
  const [retirementAge, setRetirementAge] = useState('67')
  const [currentSavings, setCurrentSavings] = useState('')
  const [annualIncome, setAnnualIncome] = useState('')
  const [contributionMode, setContributionMode] = useState<'dollar' | 'percent'>(
    'dollar',
  )
  const [contributionInput, setContributionInput] = useState('')
  const [employerMatchRate, setEmployerMatchRate] = useState('0')
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState('7')
  const [inflationRate, setInflationRate] = useState('2.5')
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState('')
  const [socialSecurityMonthly, setSocialSecurityMonthly] = useState('')
  const [yearsOfRetirement, setYearsOfRetirement] = useState('30')

  const [errors, setErrors] = useState<FieldErrors>({})
  const [result, setResult] = useState<RetirementResult | null>(null)
  const [inputsUsed, setInputsUsed] = useState<RetirementInputs | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  const annualIncomeNum = parseCurrencyInput(annualIncome) || 0

  const monthlyContributionDollar = useMemo(() => {
    if (contributionMode === 'dollar')
      return parseCurrencyInput(contributionInput) || 0
    const pct = parseFloat(contributionInput) || 0
    return ((pct / 100) * annualIncomeNum) / 12
  }, [contributionMode, contributionInput, annualIncomeNum])

  const toggleContributionMode = () => {
    if (contributionMode === 'dollar') {
      const pct =
        annualIncomeNum > 0
          ? ((monthlyContributionDollar * 12) / annualIncomeNum) * 100
          : 0
      setContributionInput(pct ? pct.toFixed(2) : '')
      setContributionMode('percent')
    } else {
      setContributionInput(
        monthlyContributionDollar ? monthlyContributionDollar.toFixed(2) : '',
      )
      setContributionMode('dollar')
    }
  }

  const handleCalculate = () => {
    const contributionRate =
      contributionMode === 'percent' ? (parseFloat(contributionInput) || 0) / 100 : 0

    const inputs: RetirementInputs = {
      currentAge: parseInt(currentAge, 10),
      retirementAge: parseInt(retirementAge, 10),
      currentSavings: parseCurrencyInput(currentSavings) || 0,
      annualIncome: annualIncomeNum,
      contributionType: contributionMode,
      monthlyContribution: monthlyContributionDollar,
      contributionRate,
      employerMatchRate: (parseFloat(employerMatchRate) || 0) / 100,
      expectedAnnualReturn: (parseFloat(expectedAnnualReturn) || 0) / 100,
      inflationRate: (parseFloat(inflationRate) || 0) / 100,
      desiredMonthlyIncome: parseCurrencyInput(desiredMonthlyIncome) || 0,
      socialSecurityMonthly: parseCurrencyInput(socialSecurityMonthly) || 0,
      yearsOfRetirement: parseInt(yearsOfRetirement, 10),
    }

    const nextErrors: FieldErrors = {}
    if (
      !inputs.currentAge ||
      inputs.currentAge < 18 ||
      inputs.currentAge > 80 ||
      !Number.isInteger(inputs.currentAge)
    ) {
      nextErrors.currentAge = 'Current age must be a whole number between 18 and 80.'
    }
    if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge) {
      nextErrors.retirementAge =
        'Retirement age must be greater than your current age.'
    }
    if (inputs.currentSavings < 0) {
      nextErrors.currentSavings = 'Current retirement savings cannot be negative.'
    }
    if (!inputs.annualIncome || inputs.annualIncome <= 0) {
      nextErrors.annualIncome = 'Annual household income must be greater than $0.'
    }
    if (inputs.monthlyContribution < 0) {
      nextErrors.monthlyContribution = 'Monthly contribution cannot be negative.'
    }
    if (inputs.employerMatchRate < 0 || inputs.employerMatchRate > 1) {
      nextErrors.employerMatchRate =
        'Employer match rate must be between 0% and 100%.'
    }
    if (inputs.expectedAnnualReturn < 0 || inputs.expectedAnnualReturn > 0.3) {
      nextErrors.expectedAnnualReturn =
        'Expected annual return must be between 0% and 30%.'
    }
    if (inputs.inflationRate < 0 || inputs.inflationRate > 0.2) {
      nextErrors.inflationRate = 'Inflation rate must be between 0% and 20%.'
    }
    if (!inputs.desiredMonthlyIncome || inputs.desiredMonthlyIncome <= 0) {
      nextErrors.desiredMonthlyIncome =
        'Desired monthly retirement income must be greater than $0.'
    }
    if (inputs.socialSecurityMonthly < 0) {
      nextErrors.socialSecurityMonthly = 'Social Security estimate cannot be negative.'
    }
    if (
      !inputs.yearsOfRetirement ||
      !Number.isInteger(inputs.yearsOfRetirement) ||
      inputs.yearsOfRetirement < 1 ||
      inputs.yearsOfRetirement > 70
    ) {
      nextErrors.yearsOfRetirement =
        'Years of retirement must be a whole number between 1 and 70.'
    } else if (inputs.retirementAge + inputs.yearsOfRetirement > 120) {
      nextErrors.yearsOfRetirement =
        'Retirement age plus years of retirement cannot exceed age 120.'
    }

    setErrors(nextErrors)
    if (
      Object.keys(nextErrors).length > 0 ||
      validateRetirementInputs(inputs).length > 0
    ) {
      setResult(null)
      setInputsUsed(null)
      return
    }

    setInputsUsed(inputs)
    setResult(calculateRetirement(inputs))
  }

  return (
    <div>
      <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {/* Column 1 — Your situation */}
          <div>
            <label className={labelClass}>Current age</label>
            <input
              type="number"
              inputMode="numeric"
              aria-label="Current age"
              placeholder="e.g. 35"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className={inputClass}
            />
            {errors.currentAge && (
              <p className="mt-1 text-xs text-error">{errors.currentAge}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Retirement age</label>
            <input
              type="number"
              inputMode="numeric"
              aria-label="Retirement age"
              placeholder="67"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className={inputClass}
            />
            {errors.retirementAge && (
              <p className="mt-1 text-xs text-error">{errors.retirementAge}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Current retirement savings</label>
            <CurrencyInput
              aria-label="Current retirement savings"
              placeholder="$50,000.00"
              value={currentSavings}
              onChange={setCurrentSavings}
              className={inputClass}
            />
            {errors.currentSavings && (
              <p className="mt-1 text-xs text-error">{errors.currentSavings}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Annual household income</label>
            <CurrencyInput
              aria-label="Annual household income"
              placeholder="$80,000.00"
              value={annualIncome}
              onChange={setAnnualIncome}
              className={inputClass}
            />
            {errors.annualIncome && (
              <p className="mt-1 text-xs text-error">{errors.annualIncome}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className={labelClass}>Monthly contribution</label>
              <div className="mb-1 flex overflow-hidden rounded-input border border-border text-xs">
                <button
                  type="button"
                  onClick={() =>
                    contributionMode !== 'dollar' && toggleContributionMode()
                  }
                  className={`px-2 py-0.5 ${
                    contributionMode === 'dollar'
                      ? 'bg-navy text-white'
                      : 'bg-white text-muted'
                  }`}
                >
                  $
                </button>
                <button
                  type="button"
                  onClick={() =>
                    contributionMode !== 'percent' && toggleContributionMode()
                  }
                  className={`px-2 py-0.5 ${
                    contributionMode === 'percent'
                      ? 'bg-navy text-white'
                      : 'bg-white text-muted'
                  }`}
                >
                  %
                </button>
              </div>
            </div>
            {contributionMode === 'dollar' ? (
              <CurrencyInput
                aria-label="Monthly contribution in dollars"
                placeholder="$500.00"
                value={contributionInput}
                onChange={setContributionInput}
                className={inputClass}
              />
            ) : (
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  aria-label="Monthly contribution percent of income"
                  placeholder="e.g. 10"
                  value={contributionInput}
                  onChange={(e) => setContributionInput(e.target.value)}
                  className={`${inputClass} pr-8`}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                  %
                </span>
              </div>
            )}
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              Include your 401(k), IRA, and any other retirement contributions.
            </p>
            {errors.monthlyContribution && (
              <p className="mt-1 text-xs text-error">
                {errors.monthlyContribution}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Employer match</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                aria-label="Employer match percent"
                placeholder="0"
                value={employerMatchRate}
                onChange={(e) => setEmployerMatchRate(e.target.value)}
                className={`${inputClass} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                %
              </span>
            </div>
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              e.g. 50% match up to 6% of salary = enter 3% (the effective match
              rate).
            </p>
            {errors.employerMatchRate && (
              <p className="mt-1 text-xs text-error">
                {errors.employerMatchRate}
              </p>
            )}
          </div>

          {/* Column 2 — Assumptions */}
          <div>
            <label className={labelClass}>Expected annual return</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                aria-label="Expected annual return percent"
                placeholder="7"
                value={expectedAnnualReturn}
                onChange={(e) => setExpectedAnnualReturn(e.target.value)}
                className={`${inputClass} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                %
              </span>
            </div>
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              Historical average for a balanced portfolio is 6–8% before
              inflation. Use 5–6% for conservative.
            </p>
            {errors.expectedAnnualReturn && (
              <p className="mt-1 text-xs text-error">
                {errors.expectedAnnualReturn}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Inflation rate</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                aria-label="Inflation rate percent"
                placeholder="2.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className={`${inputClass} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                %
              </span>
            </div>
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              Used to calculate purchasing power of future savings in
              today&apos;s dollars.
            </p>
            {errors.inflationRate && (
              <p className="mt-1 text-xs text-error">{errors.inflationRate}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Desired retirement income (monthly)
            </label>
            <CurrencyInput
              aria-label="Desired retirement income monthly"
              placeholder="$5,000.00"
              value={desiredMonthlyIncome}
              onChange={setDesiredMonthlyIncome}
              className={inputClass}
            />
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              In today&apos;s dollars — the calculator adjusts for inflation.
            </p>
            {errors.desiredMonthlyIncome && (
              <p className="mt-1 text-xs text-error">
                {errors.desiredMonthlyIncome}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Social Security estimate (monthly)
            </label>
            <CurrencyInput
              aria-label="Social Security estimate monthly"
              placeholder="$0.00"
              value={socialSecurityMonthly}
              onChange={setSocialSecurityMonthly}
              className={inputClass}
            />
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              Find your estimate at ssa.gov/myaccount. Leave blank to exclude.
            </p>
            {errors.socialSecurityMonthly && (
              <p className="mt-1 text-xs text-error">
                {errors.socialSecurityMonthly}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Years of retirement</label>
            <input
              type="number"
              inputMode="numeric"
              aria-label="Years of retirement"
              placeholder="30"
              value={yearsOfRetirement}
              onChange={(e) => setYearsOfRetirement(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1 text-xs italic text-[#9CA3AF]">
              Planning to age {(parseInt(retirementAge, 10) || 67) + (parseInt(yearsOfRetirement, 10) || 30)} (
              age {retirementAge || 67} + {yearsOfRetirement || 30} years) is a
              common conservative assumption.
            </p>
            {errors.yearsOfRetirement && (
              <p className="mt-1 text-xs text-error">
                {errors.yearsOfRetirement}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-all hover:bg-[#16264d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 active:scale-[0.98] active:bg-[#111f43]"
        >
          Calculate my retirement outlook
        </button>
      </div>

      {result && inputsUsed && (
        <div ref={resultsRef} className="scroll-mt-20">
          <hr className="my-6 border-0 border-t border-border" />
          <RetirementResultsPanel result={result} inputs={inputsUsed} />
        </div>
      )}
    </div>
  )
}
