import type {
  FilingStatus,
  PayFrequency,
  PaycheckInput,
  PaycheckResult,
} from '@/types/calculator'
import { STATE_TAX_RATES } from './stateTaxRates'

export type { FilingStatus, PayFrequency, PaycheckInput, PaycheckResult }

interface Bracket {
  min: number
  max: number // Infinity for top bracket
  rate: number
}

// 2024 federal income tax brackets.
const BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.1 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married_separately: [
    { min: 0, max: 11600, rate: 0.1 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married_jointly: [
    { min: 0, max: 23200, rate: 0.1 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.1 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
}

const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 14600,
  married_jointly: 29200,
  married_separately: 14600,
  head_of_household: 21900,
}

const PAY_PERIODS: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52,
}

// FICA constants (2024).
const SS_WAGE_BASE = 168600
const SS_RATE = 0.062
const MEDICARE_RATE = 0.0145
const ADDL_MEDICARE_RATE = 0.009
const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  married_separately: 125000,
  married_jointly: 250000,
  head_of_household: 200000,
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function payPeriodsFor(frequency: PayFrequency): number {
  return PAY_PERIODS[frequency]
}

/** Progressive federal tax on taxable income for a filing status. */
export function federalTaxOn(
  taxableIncome: number,
  filingStatus: FilingStatus,
): number {
  const income = Math.max(0, taxableIncome)
  let tax = 0
  for (const b of BRACKETS[filingStatus]) {
    if (income <= b.min) break
    const upper = Math.min(income, b.max)
    tax += (upper - b.min) * b.rate
  }
  return round2(tax)
}

export function calculatePaycheck(input: PaycheckInput): PaycheckResult {
  const payPeriods = PAY_PERIODS[input.payFrequency]
  const stateRate = STATE_TAX_RATES[input.state] ?? 0

  // 1. Gross salary is entered as an ANNUAL figure. Pay frequency only
  //    controls how the net (and per-paycheck deductions) are split.
  const annualGross = input.grossSalary

  // 2. Annual pre-tax deductions (401k + health insurance).
  const annual401k = (input.retirement401kPercent / 100) * annualGross
  const annualHealth = input.healthInsurancePerPeriod * payPeriods
  const annualPreTax = annual401k + annualHealth

  // 3. Taxable income.
  const standardDeduction = STANDARD_DEDUCTION[input.filingStatus]
  const taxableIncome = Math.max(
    0,
    annualGross - standardDeduction - annualPreTax,
  )

  // 4. Federal tax.
  const federalTaxAnnual = federalTaxOn(taxableIncome, input.filingStatus)

  // 5. State tax (flat rate on taxable income).
  const stateTaxAnnual = taxableIncome * stateRate

  // 6. Social Security.
  const socialSecurityAnnual = Math.min(annualGross, SS_WAGE_BASE) * SS_RATE

  // 7. Medicare (+ additional Medicare over threshold).
  const addlThreshold = ADDL_MEDICARE_THRESHOLD[input.filingStatus]
  const addlMedicare =
    annualGross > addlThreshold
      ? (annualGross - addlThreshold) * ADDL_MEDICARE_RATE
      : 0
  const medicareAnnual = annualGross * MEDICARE_RATE + addlMedicare

  // 8. Additional withholding.
  const additionalWithholdingAnnual =
    input.additionalWithholdingPerPeriod * payPeriods

  // 9. Net annual.
  const netAnnual =
    annualGross -
    federalTaxAnnual -
    stateTaxAnnual -
    socialSecurityAnnual -
    medicareAnnual -
    annualPreTax -
    additionalWithholdingAnnual

  const netPerPeriod = netAnnual / payPeriods

  const effectiveFederalRate =
    annualGross > 0 ? (federalTaxAnnual / annualGross) * 100 : 0
  const totalTax =
    federalTaxAnnual +
    stateTaxAnnual +
    socialSecurityAnnual +
    medicareAnnual
  const effectiveTotalRate =
    annualGross > 0 ? (totalTax / annualGross) * 100 : 0

  return {
    grossPerPeriod: round2(annualGross / payPeriods),
    federalTax: round2(federalTaxAnnual / payPeriods),
    stateTax: round2(stateTaxAnnual / payPeriods),
    socialSecurity: round2(socialSecurityAnnual / payPeriods),
    medicare: round2(medicareAnnual / payPeriods),
    retirement401k: round2(annual401k / payPeriods),
    healthInsurance: round2(input.healthInsurancePerPeriod),
    additionalWithholding: round2(input.additionalWithholdingPerPeriod),
    netPerPeriod: round2(netPerPeriod),
    netAnnual: round2(netAnnual),
    effectiveFederalRate: round2(effectiveFederalRate),
    effectiveTotalRate: round2(effectiveTotalRate),
    payPeriods,
  }
}
