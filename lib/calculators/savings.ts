import type { SavingsInput, SavingsResult, SavingsYearRow } from '@/types/calculator'

export type { SavingsInput, SavingsResult, SavingsYearRow }

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
