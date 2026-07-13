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
