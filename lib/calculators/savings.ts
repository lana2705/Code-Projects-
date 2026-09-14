import type {
  SavingsInput,
  SavingsResult,
  SavingsYearRow,
  SavingsGoalResult,
} from '@/types/calculator'

export type { SavingsInput, SavingsResult, SavingsYearRow, SavingsGoalResult }

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

/**
 * Compounds monthly: each month earns interest on the current balance, then
 * the monthly contribution is added. This slightly understates interest
 * compared to compounding-then-contributing-at-period-start, which matches
 * how most bank savings calculators present a conservative estimate.
 */
export function calculateSavings(input: SavingsInput): SavingsResult {
  const { initialDeposit, monthlyContribution, annualRate, years } = input
  const monthlyRate = annualRate / 100 / 12
  const totalMonths = Math.round(years * 12)

  let balance = initialDeposit
  const yearlyBreakdown: SavingsYearRow[] = []
  let yearStartBalance = initialDeposit
  let yearContributions = 0
  let yearInterest = 0

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyRate
    balance += interest + monthlyContribution
    yearInterest += interest
    yearContributions += monthlyContribution

    if (month % 12 === 0) {
      yearlyBreakdown.push({
        year: month / 12,
        startBalance: round2(yearStartBalance),
        contributions: round2(yearContributions),
        interestEarned: round2(yearInterest),
        endBalance: round2(balance),
      })
      yearStartBalance = balance
      yearContributions = 0
      yearInterest = 0
    }
  }

  const totalContributions = round2(
    initialDeposit + monthlyContribution * totalMonths,
  )
  const finalBalance = round2(balance)

  return {
    finalBalance,
    totalContributions,
    totalInterestEarned: round2(finalBalance - totalContributions),
    yearlyBreakdown,
  }
}

/** Calculate the month the balance first equals or exceeds the goal. */
export function calculateGoalDate(
  startingBalance: number,
  monthlyContribution: number,
  annualRate: number,
  goalAmount: number,
): SavingsGoalResult {
  if (!goalAmount || goalAmount <= 0) {
    return { monthsToGoal: null, goalReachDate: null, willReachGoal: false }
  }

  if (startingBalance >= goalAmount) {
    return { monthsToGoal: 0, goalReachDate: new Date(), willReachGoal: true }
  }

  const monthlyRate = annualRate / 100 / 12
  let balance = startingBalance
  let months = 0
  const maxMonths = 600 // 50 years cap

  while (balance < goalAmount && months < maxMonths) {
    balance = balance * (1 + monthlyRate) + monthlyContribution
    months++
  }

  if (months >= maxMonths) {
    return { monthsToGoal: null, goalReachDate: null, willReachGoal: false }
  }

  const goalDate = new Date()
  goalDate.setMonth(goalDate.getMonth() + months)

  return { monthsToGoal: months, goalReachDate: goalDate, willReachGoal: true }
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
