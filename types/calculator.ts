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
  retirement401kCapped: boolean // true if capped at the IRS annual limit
  healthInsurance: number // per period
  additionalWithholding: number // per period
  netPerPeriod: number
  netAnnual: number
  effectiveFederalRate: number // percentage
  effectiveTotalRate: number // percentage
  payPeriods: number
}

// Savings calculator types

export interface SavingsInput {
  initialDeposit: number
  monthlyContribution: number
  annualRate: number // percentage
  years: number
}

export interface SavingsYearRow {
  year: number
  startBalance: number
  contributions: number
  interestEarned: number
  endBalance: number
}

export interface SavingsResult {
  finalBalance: number
  totalContributions: number // initial deposit + all monthly contributions
  totalInterestEarned: number
  yearlyBreakdown: SavingsYearRow[]
}

export interface SavingsGoalResult {
  monthsToGoal: number | null // null if goal not set or unreachable in timeframe
  goalReachDate: Date | null
  willReachGoal: boolean
}

// Budget calculator types

export interface BudgetCategory {
  label: string
  percent: number
  amount: number
  examples: string[]
}

export interface BudgetResult {
  monthlyIncome: number
  needs: BudgetCategory
  wants: BudgetCategory
  savings: BudgetCategory
}

// Mortgage calculator types

export interface MortgageInputs {
  homePrice: number
  downPayment: number
  loanTermYears: number
  annualInterestRate: number
  startDate: Date
  annualPropertyTax?: number
  annualInsurance?: number
  monthlyHOA?: number
  pmiRate?: number // stored as decimal: 0.005 = 0.5%
  extraMonthlyPayment?: number
}

export interface AmortizationMonth {
  month: number
  date: Date
  payment: number // P&I + estimatedPMI for that month (tax/insurance/HOA excluded)
  principal: number
  interest: number
  estimatedPMI: number
  remainingBalance: number
  cumulativeInterest: number
}

export interface MortgageResult {
  loanAmount: number
  monthlyPrincipalAndInterest: number
  firstMonthPrincipal: number
  firstMonthInterest: number
  monthlyPropertyTax: number
  monthlyInsurance: number
  monthlyHOA: number
  estimatedMonthlyPMI: number
  totalMonthlyPayment: number // P&I + tax + insurance + HOA + PMI
  totalInterestPaid: number
  totalMortgagePayments: number // principal + interest only
  payoffDate: Date
  downPaymentPercent: number

  pmiScheduledCancellationMonth: number | null // 80% LTV — request-eligibility only
  pmiScheduledCancellationDate: Date | null
  pmiScheduledTerminationMonth: number | null // 78% LTV — automatic termination
  pmiScheduledTerminationDate: Date | null
  pmiMidpointTerminationMonth: number | null // loan midpoint + 1
  pmiDisplayedTerminationMonth: number | null // earlier of 78% termination and midpoint
  pmiDisplayedTerminationDate: Date | null

  amortizationSchedule: AmortizationMonth[]
}

export interface MortgageExtraPaymentResult {
  payoffMonth: number
  payoffDate: Date
  totalInterest: number
  monthsSaved: number
  interestSaved: number
  actualCancellationEligibleMonthWithExtraPayments: number | null
  actualCancellationEligibleDateWithExtraPayments: Date | null
}

// Retirement calculator types

export interface RetirementInputs {
  currentAge: number
  retirementAge: number
  currentSavings: number
  annualIncome: number
  contributionType: 'dollar' | 'percent' // how the user entered the contribution
  monthlyContribution: number // always in dollars by the time it reaches the calculator
  contributionRate: number // 0.10 for 10%; 0 if contributionType is 'dollar'
  employerMatchRate: number // e.g. 0.03 for 3% effective match
  expectedAnnualReturn: number // e.g. 0.07 for 7%
  inflationRate: number // e.g. 0.025 for 2.5%
  desiredMonthlyIncome: number // in today's dollars
  socialSecurityMonthly: number // in today's dollars, 0 if none
  yearsOfRetirement: number // integer, 1-70
}

export interface RetirementYear {
  age: number
  year: number
  balance: number
  balanceInTodaysDollars: number
  annualContribution: number
  annualEmployerMatch: number
  annualGrowth: number
  cumulativeContributions: number
  cumulativeGrowth: number
}

export type RetirementOnTrackStatus =
  | 'on_track'
  | 'slightly_behind'
  | 'significantly_behind'
  | 'surplus'

export interface RetirementResult {
  projectedBalance: number
  projectedBalanceInTodaysDollars: number
  yearsToRetirement: number
  totalContributions: number
  totalEmployerMatch: number
  totalGrowth: number

  requiredNestEgg: number
  estimatedMonthlyWithdrawal: number
  socialSecurityMonthly: number
  totalMonthlyIncome: number
  monthlyIncomeGap: number

  desiredMonthlyIncomeNominal: number
  socialSecurityNominal: number

  onTrackStatus: RetirementOnTrackStatus
  fundingPercentage: number

  additionalMonthlySavingsNeeded: number
  retireEarlierAge: number | null

  yearlyProjections: RetirementYear[]
}
