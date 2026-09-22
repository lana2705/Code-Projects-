import type {
  MortgageInputs,
  MortgageResult,
  MortgageExtraPaymentResult,
  AmortizationMonth,
} from '@/types/calculator'

export type {
  MortgageInputs,
  MortgageResult,
  MortgageExtraPaymentResult,
  AmortizationMonth,
}

const MAX_MONTHS = 600

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

function addMonths(base: Date, months: number): Date {
  return new Date(base.getFullYear(), base.getMonth() + months, 1)
}

export function validateMortgageInputs(inputs: MortgageInputs): string[] {
  const errors: string[] = []

  if (!inputs.homePrice || inputs.homePrice <= 0)
    errors.push('Home price must be greater than $0.')
  if (inputs.downPayment < 0)
    errors.push('Down payment cannot be negative.')
  if (inputs.homePrice > 0 && inputs.downPayment >= inputs.homePrice)
    errors.push('Down payment cannot equal or exceed the home price.')
  if (inputs.annualInterestRate < 0 || inputs.annualInterestRate > 30)
    errors.push('Interest rate must be between 0% and 30%.')
  if (inputs.loanTermYears <= 0)
    errors.push('Loan term must be greater than 0.')
  if ((inputs.annualPropertyTax ?? 0) < 0)
    errors.push('Property tax cannot be negative.')
  if ((inputs.annualInsurance ?? 0) < 0)
    errors.push('Home insurance cannot be negative.')
  if ((inputs.monthlyHOA ?? 0) < 0)
    errors.push('HOA fees cannot be negative.')
  if ((inputs.pmiRate ?? 0) < 0 || (inputs.pmiRate ?? 0) > 0.1)
    errors.push('PMI rate must be between 0% and 10%.')
  if ((inputs.extraMonthlyPayment ?? 0) < 0)
    errors.push('Extra payment cannot be negative.')

  return errors
}

function monthlyPayment(
  loanAmount: number,
  monthlyRate: number,
  numPayments: number,
): number {
  if (monthlyRate === 0) return loanAmount / numPayments
  return (
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  )
}

/**
 * Runs the standard (no extra payment) amortization once to find the month
 * the scheduled balance first crosses the 80% and 78% LTV thresholds. These
 * scheduled dates are fixed by the original loan terms and don't move even
 * if the borrower later makes extra payments.
 */
function findScheduledPmiMonths(
  loanAmount: number,
  homePrice: number,
  monthlyRate: number,
  monthlyPI: number,
  numPayments: number,
): { cancellationMonth: number | null; terminationMonth: number | null } {
  const threshold80 = homePrice * 0.8
  const threshold78 = homePrice * 0.78
  let balance = loanAmount
  let cancellationMonth: number | null = null
  let terminationMonth: number | null = null

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate
    let principalPayment = monthlyPI - interestPayment
    if (principalPayment >= balance) principalPayment = balance
    balance = Math.max(0, balance - principalPayment)

    if (cancellationMonth === null && balance <= threshold80) {
      cancellationMonth = month
    }
    if (terminationMonth === null && balance <= threshold78) {
      terminationMonth = month
    }
    if (balance === 0) break
  }

  return { cancellationMonth, terminationMonth }
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const {
    homePrice,
    downPayment,
    loanTermYears,
    annualInterestRate,
    startDate,
    annualPropertyTax,
    annualInsurance,
    monthlyHOA,
    pmiRate,
  } = inputs

  const monthlyRate = annualInterestRate / 100 / 12
  const numPayments = Math.min(Math.round(loanTermYears * 12), MAX_MONTHS)
  const loanAmount = homePrice - downPayment
  const downPaymentPercent = (downPayment / homePrice) * 100

  const monthlyPI = monthlyPayment(loanAmount, monthlyRate, numPayments)

  const monthlyPropertyTax = (annualPropertyTax ?? 0) / 12
  const monthlyInsurance = (annualInsurance ?? 0) / 12
  const hoa = monthlyHOA ?? 0
  const pmiApplies = downPaymentPercent < 20
  const estimatedMonthlyPMI = pmiApplies
    ? (loanAmount * (pmiRate ?? 0.005)) / 12
    : 0

  const midpointTerminationMonth = Math.floor(numPayments / 2) + 1

  let pmiScheduledCancellationMonth: number | null = null
  let pmiScheduledTerminationMonth: number | null = null
  let pmiMidpointTerminationMonth: number | null = null
  let pmiDisplayedTerminationMonth: number | null = null

  if (pmiApplies) {
    const scheduled = findScheduledPmiMonths(
      loanAmount,
      homePrice,
      monthlyRate,
      monthlyPI,
      numPayments,
    )
    pmiScheduledCancellationMonth = scheduled.cancellationMonth
    pmiScheduledTerminationMonth = scheduled.terminationMonth
    pmiMidpointTerminationMonth = midpointTerminationMonth
    pmiDisplayedTerminationMonth = Math.min(
      pmiScheduledTerminationMonth ?? Infinity,
      pmiMidpointTerminationMonth,
    )
  }

  const amortizationSchedule: AmortizationMonth[] = []
  let balance = loanAmount
  let cumulativeInterest = 0
  let firstMonthPrincipal = 0
  let firstMonthInterest = 0
  let payoffMonth = numPayments

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = round2(balance * monthlyRate)
    let principalPayment = monthlyPI - interestPayment
    if (principalPayment >= balance) principalPayment = balance
    principalPayment = round2(principalPayment)

    const pmiThisMonth =
      pmiDisplayedTerminationMonth !== null && month < pmiDisplayedTerminationMonth
        ? round2(estimatedMonthlyPMI)
        : 0

    const newBalance = round2(Math.max(0, balance - principalPayment))
    cumulativeInterest = round2(cumulativeInterest + interestPayment)

    if (month === 1) {
      firstMonthPrincipal = principalPayment
      firstMonthInterest = interestPayment
    }

    amortizationSchedule.push({
      month,
      date: addMonths(startDate, month - 1),
      payment: round2(interestPayment + principalPayment + pmiThisMonth),
      principal: principalPayment,
      interest: interestPayment,
      estimatedPMI: pmiThisMonth,
      remainingBalance: newBalance,
      cumulativeInterest,
    })

    balance = newBalance
    if (balance === 0) {
      payoffMonth = month
      break
    }
  }

  const totalInterestPaid = cumulativeInterest
  const totalMortgagePayments = round2(loanAmount + totalInterestPaid)
  const payoffDate = addMonths(startDate, payoffMonth - 1)
  const totalMonthlyPayment = round2(
    monthlyPI + monthlyPropertyTax + monthlyInsurance + hoa + estimatedMonthlyPMI,
  )

  return {
    loanAmount: round2(loanAmount),
    monthlyPrincipalAndInterest: round2(monthlyPI),
    firstMonthPrincipal,
    firstMonthInterest,
    monthlyPropertyTax: round2(monthlyPropertyTax),
    monthlyInsurance: round2(monthlyInsurance),
    monthlyHOA: round2(hoa),
    estimatedMonthlyPMI: round2(estimatedMonthlyPMI),
    totalMonthlyPayment,
    totalInterestPaid,
    totalMortgagePayments,
    payoffDate,
    downPaymentPercent,
    pmiScheduledCancellationMonth,
    pmiScheduledCancellationDate:
      pmiScheduledCancellationMonth !== null
        ? addMonths(startDate, pmiScheduledCancellationMonth - 1)
        : null,
    pmiScheduledTerminationMonth,
    pmiScheduledTerminationDate:
      pmiScheduledTerminationMonth !== null
        ? addMonths(startDate, pmiScheduledTerminationMonth - 1)
        : null,
    pmiMidpointTerminationMonth,
    pmiDisplayedTerminationMonth,
    pmiDisplayedTerminationDate:
      pmiDisplayedTerminationMonth !== null
        ? addMonths(startDate, pmiDisplayedTerminationMonth - 1)
        : null,
    amortizationSchedule,
  }
}

/**
 * Re-runs a full month-by-month amortization with an extra principal payment
 * applied every month. Extra payments don't move the statutory 78%/midpoint
 * PMI termination dates (those are fixed by the original schedule), but they
 * do let the borrower reach 80% LTV — and become eligible to request PMI
 * removal — sooner than the original schedule predicted.
 */
function calcWithExtraPayment(
  loanAmount: number,
  homePrice: number,
  monthlyPI: number,
  monthlyRate: number,
  numPayments: number,
  extraMonthlyPayment: number,
): {
  payoffMonth: number
  totalInterest: number
  actualCancellationEligibleMonthWithExtraPayments: number | null
} {
  let balance = loanAmount
  let totalInterest = 0
  let actualCancellationEligibleMonthWithExtraPayments: number | null = null
  const threshold80 = homePrice * 0.8

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate
    totalInterest += interestPayment
    const principalPayment = Math.min(
      monthlyPI - interestPayment + extraMonthlyPayment,
      balance,
    )
    balance = Math.max(0, balance - principalPayment)

    if (
      actualCancellationEligibleMonthWithExtraPayments === null &&
      balance <= threshold80
    ) {
      actualCancellationEligibleMonthWithExtraPayments = month
    }

    if (balance === 0) {
      return {
        payoffMonth: month,
        totalInterest: round2(totalInterest),
        actualCancellationEligibleMonthWithExtraPayments,
      }
    }
  }
  return {
    payoffMonth: numPayments,
    totalInterest: round2(totalInterest),
    actualCancellationEligibleMonthWithExtraPayments,
  }
}

export function compareExtraPayment(
  base: MortgageResult,
  inputs: MortgageInputs,
  extraMonthlyPayment: number,
): MortgageExtraPaymentResult {
  const { homePrice, downPayment, loanTermYears, annualInterestRate, startDate } =
    inputs
  const monthlyRate = annualInterestRate / 100 / 12
  const numPayments = Math.min(Math.round(loanTermYears * 12), MAX_MONTHS)
  const loanAmount = homePrice - downPayment
  const monthlyPI = monthlyPayment(loanAmount, monthlyRate, numPayments)

  const result = calcWithExtraPayment(
    loanAmount,
    homePrice,
    monthlyPI,
    monthlyRate,
    numPayments,
    extraMonthlyPayment,
  )

  const basePayoffMonth = base.amortizationSchedule.length

  return {
    payoffMonth: result.payoffMonth,
    payoffDate: addMonths(startDate, result.payoffMonth - 1),
    totalInterest: result.totalInterest,
    monthsSaved: Math.max(0, basePayoffMonth - result.payoffMonth),
    interestSaved: round2(base.totalInterestPaid - result.totalInterest),
    actualCancellationEligibleMonthWithExtraPayments:
      result.actualCancellationEligibleMonthWithExtraPayments,
    actualCancellationEligibleDateWithExtraPayments:
      result.actualCancellationEligibleMonthWithExtraPayments !== null
        ? addMonths(
            startDate,
            result.actualCancellationEligibleMonthWithExtraPayments - 1,
          )
        : null,
  }
}

/** Human-readable months → "2 years and 7 months" (or "1 month", "3 years"). */
export function formatYearsAndMonths(months: number): string {
  const years = Math.floor(months / 12)
  const rem = months % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`)
  if (rem > 0) parts.push(`${rem} month${rem !== 1 ? 's' : ''}`)
  return parts.join(' and ') || '0 months'
}
