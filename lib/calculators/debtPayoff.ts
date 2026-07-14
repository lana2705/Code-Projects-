import type {
  Debt,
  MonthlyPayment,
  PayoffResult,
} from '@/types/calculator'

export type { Debt, MonthlyPayment, PayoffResult }

const MAX_MONTHS = 600

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

function addMonths(base: Date, months: number): Date {
  const d = new Date(base.getFullYear(), base.getMonth() + months, 1)
  return d
}

/**
 * Returns the names of any debts whose minimum payment does not cover the
 * first month's interest. These debts can never make progress on their own.
 */
export function debtsWithInsufficientMinimum(debts: Debt[]): string[] {
  return debts
    .filter((d) => d.minimumPayment < round2((d.balance * d.apr) / 100 / 12))
    .map((d) => d.name)
}

function simulate(
  debts: Debt[],
  extraPayment: number,
  method: 'avalanche' | 'snowball',
): PayoffResult {
  const startDate = new Date()

  // Working copies of balances keyed by debt id.
  const balances = new Map<string, number>()
  debts.forEach((d) => balances.set(d.id, round2(d.balance)))

  // Priority order: avalanche = highest APR first, snowball = smallest balance first.
  const order = [...debts].sort((a, b) =>
    method === 'avalanche'
      ? b.apr - a.apr
      : a.balance - b.balance,
  )

  const totalMinimums = debts.reduce((sum, d) => sum + d.minimumPayment, 0)
  const monthlyBudget = round2(totalMinimums + extraPayment)

  const schedule: MonthlyPayment[] = []
  const payoffSequence: string[] = []
  let totalInterestPaid = 0
  let totalAmountPaid = 0
  let month = 0
  let cappedOut = false

  const remaining = () =>
    order.filter((d) => (balances.get(d.id) ?? 0) > 0.005)

  while (remaining().length > 0) {
    month += 1
    if (month > MAX_MONTHS) {
      cappedOut = true
      break
    }

    const unpaid = remaining()

    // 1. Accrue this month's interest on every unpaid debt.
    const interestByDebt = new Map<string, number>()
    unpaid.forEach((d) => {
      const bal = balances.get(d.id) ?? 0
      const interest = round2((bal * d.apr) / 100 / 12)
      interestByDebt.set(d.id, interest)
      balances.set(d.id, round2(bal + interest))
    })

    // 2. Allocate the monthly budget: minimums first, then roll the remainder
    //    (freed minimums + extra) onto debts in priority order.
    let pool = monthlyBudget
    const paidThisMonth = new Map<string, number>()

    unpaid.forEach((d) => {
      const bal = balances.get(d.id) ?? 0
      const pay = round2(Math.min(d.minimumPayment, bal, pool))
      paidThisMonth.set(d.id, pay)
      pool = round2(pool - pay)
    })

    for (const d of unpaid) {
      if (pool <= 0.005) break
      const bal = balances.get(d.id) ?? 0
      const already = paidThisMonth.get(d.id) ?? 0
      const room = round2(bal - already)
      const add = round2(Math.min(room, pool))
      if (add > 0) {
        paidThisMonth.set(d.id, round2(already + add))
        pool = round2(pool - add)
      }
    }

    // 3. Apply payments and build this month's record.
    const payments: MonthlyPayment['payments'] = []
    let monthTotalPayment = 0

    unpaid.forEach((d) => {
      const balAfterInterest = balances.get(d.id) ?? 0
      const interest = interestByDebt.get(d.id) ?? 0
      const payment = paidThisMonth.get(d.id) ?? 0
      const principal = round2(payment - interest)
      const newBalance = round2(balAfterInterest - payment)
      balances.set(d.id, newBalance)

      totalInterestPaid = round2(totalInterestPaid + interest)
      totalAmountPaid = round2(totalAmountPaid + payment)
      monthTotalPayment = round2(monthTotalPayment + payment)

      payments.push({
        debtName: d.name,
        principal,
        interest,
        balance: newBalance,
      })

      if (newBalance <= 0.005 && !payoffSequence.includes(d.name)) {
        payoffSequence.push(d.name)
      }
    })

    const remainingBalance = round2(
      order.reduce((sum, d) => sum + (balances.get(d.id) ?? 0), 0),
    )

    schedule.push({
      month,
      date: addMonths(startDate, month),
      payments,
      totalPayment: monthTotalPayment,
      remainingBalance,
    })

    // Safety: if budget cannot dent total balance, bail to avoid infinite loop.
    if (monthTotalPayment <= 0.005) {
      cappedOut = true
      break
    }
  }

  const monthsToPayoff = cappedOut ? MAX_MONTHS : month

  return {
    method,
    payoffDate: addMonths(startDate, Math.max(monthsToPayoff, 1)),
    totalInterestPaid: round2(totalInterestPaid),
    totalAmountPaid: round2(totalAmountPaid),
    monthlySchedule: schedule,
    debtOrder: payoffSequence,
    cappedOut,
    monthsToPayoff,
  }
}

export function calculateAvalanche(
  debts: Debt[],
  extraPayment = 0,
): PayoffResult {
  return simulate(debts, extraPayment, 'avalanche')
}

export function calculateSnowball(
  debts: Debt[],
  extraPayment = 0,
): PayoffResult {
  return simulate(debts, extraPayment, 'snowball')
}

export interface DebtComparison {
  avalanche: PayoffResult
  snowball: PayoffResult
  bestMethod: 'avalanche' | 'snowball'
  interestSaved: number
}

export function comparePayoffMethods(
  debts: Debt[],
  extraPayment = 0,
): DebtComparison {
  const avalanche = calculateAvalanche(debts, extraPayment)
  const snowball = calculateSnowball(debts, extraPayment)
  const bestMethod =
    avalanche.totalInterestPaid <= snowball.totalInterestPaid
      ? 'avalanche'
      : 'snowball'
  const interestSaved = round2(
    Math.abs(avalanche.totalInterestPaid - snowball.totalInterestPaid),
  )
  return { avalanche, snowball, bestMethod, interestSaved }
}

/** Human-readable months → "4 yrs 11 mo" (or "50+ years" when capped). */
export function formatMonths(months: number, cappedOut = false): string {
  if (cappedOut || months >= MAX_MONTHS) return '50+ years'
  const years = Math.floor(months / 12)
  const rem = months % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rem > 0) parts.push(`${rem} mo`)
  return parts.join(' ') || '0 mo'
}

export interface CombinedResult {
  balance: number
  weightedApr: number
  monthlyPayment: number
  months: number
  totalInterestPaid: number
  totalAmountPaid: number
  payoffDate: Date
  cappedOut: boolean
  monthlySchedule: MonthlyPayment[]
}

/**
 * Treat every debt as one combined "bucket": total balance, balance-weighted
 * average APR, and the sum of all minimum payments plus any extra.
 */
export function calculateCombined(
  debts: Debt[],
  extraPayment = 0,
): CombinedResult {
  const balance = round2(debts.reduce((s, d) => s + d.balance, 0))
  const weightedApr =
    balance > 0
      ? round2(debts.reduce((s, d) => s + d.balance * d.apr, 0) / balance)
      : 0
  const monthlyPayment = round2(
    debts.reduce((s, d) => s + d.minimumPayment, 0) + extraPayment,
  )
  const combined: Debt = {
    id: 'combined',
    name: 'All debts',
    balance,
    apr: weightedApr,
    minimumPayment: monthlyPayment,
  }
  // Extra is already folded into the combined minimum payment.
  const r = simulate([combined], 0, 'avalanche')
  return {
    balance,
    weightedApr,
    monthlyPayment,
    months: r.monthsToPayoff,
    totalInterestPaid: r.totalInterestPaid,
    totalAmountPaid: r.totalAmountPaid,
    payoffDate: r.payoffDate,
    cappedOut: r.cappedOut,
    monthlySchedule: r.monthlySchedule,
  }
}

export interface SingleDebtPlan {
  debt: Debt
  months: number
  totalInterestPaid: number
  totalAmountPaid: number
  payoffDate: Date
  cappedOut: boolean
  monthlySchedule: MonthlyPayment[]
}

/** Standalone payoff plan for a single debt paying only its own minimum. */
export function calculateSingleDebt(debt: Debt): SingleDebtPlan {
  const r = simulate([debt], 0, 'avalanche')
  return {
    debt,
    months: r.monthsToPayoff,
    totalInterestPaid: r.totalInterestPaid,
    totalAmountPaid: r.totalAmountPaid,
    payoffDate: r.payoffDate,
    cappedOut: r.cappedOut,
    monthlySchedule: r.monthlySchedule,
  }
}

export interface FirstDebtRecommendation {
  debt: Debt
  reason: string
}

/**
 * Which debt to attack first. Follows the avalanche principle (highest APR),
 * which minimizes total interest paid.
 */
export function recommendFirstDebt(
  debts: Debt[],
): FirstDebtRecommendation | null {
  if (debts.length === 0) return null
  const top = [...debts].sort((a, b) => b.apr - a.apr)[0]
  const smallest = [...debts].sort((a, b) => a.balance - b.balance)[0]
  const alsoSmallest = smallest.id === top.id
  return {
    debt: top,
    reason: alsoSmallest
      ? `It has the highest APR (${top.apr}%) and the smallest balance, so it's the clear first target — you'll cut the most interest and score a quick win.`
      : `It has the highest APR (${top.apr}%), so clearing it first saves the most in interest (the avalanche method).`,
  }
}
