// Debt payoff types

export interface Debt {
  id: string
  name: string
  balance: number
  apr: number
  minimumPayment: number
}

export interface MonthlyPayment {
  month: number
  date: Date
  payments: { debtName: string; principal: number; interest: number; balance: number }[]
  totalPayment: number
  remainingBalance: number
}

export interface PayoffResult {
  method: 'avalanche' | 'snowball'
  payoffDate: Date
  totalInterestPaid: number
  totalAmountPaid: number
  monthlySchedule: MonthlyPayment[]
  debtOrder: string[]
  cappedOut: boolean
  monthsToPayoff: number
}

// Paycheck types

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly'

export type FilingStatus =
  | 'single'
  | 'married_jointly'
  | 'married_separately'
  | 'head_of_household'

export interface PaycheckInput {
  grossSalary: number
  payFrequency: PayFrequency
  filingStatus: FilingStatus
  state: string
  retirement401kPercent: number
  healthInsurancePerPeriod: number
  additionalWithholdingPerPeriod: number
}

export interface PaycheckResult {
  grossPerPeriod: number
  federalTax: number // per period
  stateTax: number // per period
  socialSecurity: number // per period
  medicare: number // per period
  retirement401k: number // per period
  healthInsurance: number // per period
  additionalWithholding: number // per period
  netPerPeriod: number
  netAnnual: number
  effectiveFederalRate: number // percentage
  effectiveTotalRate: number // percentage
  payPeriods: number
}
