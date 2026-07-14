'use client'

import { useMemo, useState } from 'react'
import type { Debt, PayoffResult } from '@/types/calculator'
import type { DebtComparison } from '@/lib/calculators/debtPayoff'
import { formatCurrency, formatMonthYear, formatShortDate } from '@/lib/format'

const DEBT_COLORS = [
  '#1B2E5E',
  '#2E7D5E',
  '#4A6FA5',
  '#E07B54',
  '#9B59B6',
  '#E74C3C',
]

interface DebtResultsPanelProps {
  comparison: DebtComparison
  debts: Debt[]
}

function payoffMonthByDebt(result: PayoffResult): Record<string, number> {
  const map: Record<string, number> = {}
  for (const m of result.monthlySchedule) {
    for (const p of m.payments) {
      if (p.balance <= 0.005 && map[p.debtName] === undefined) {
        map[p.debtName] = m.month
      }
    }
  }
  return map
}

function monthsLabel(result: PayoffResult): string {
  if (result.cappedOut) return '50+ years'
  const years = Math.floor(result.monthsToPayoff / 12)
  const months = result.monthsToPayoff % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (months > 0) parts.push(`${months} mo`)
  return parts.join(' ') || '0 mo'
}

export default function DebtResultsPanel({
  comparison,
  debts,
}: DebtResultsPanelProps) {
  const { avalanche, snowball, bestMethod, interestSaved } = comparison
  const best = bestMethod === 'avalanche' ? avalanche : snowball

  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [scheduleTab, setScheduleTab] = useState<'avalanche' | 'snowball'>(
    'avalanche',
  )

  const colorByDebt = useMemo(() => {
    const map: Record<string, string> = {}
    debts.forEach((d, i) => {
      map[d.name] = DEBT_COLORS[i % DEBT_COLORS.length]
    })
    return map
  }, [debts])

  const activeSchedule = scheduleTab === 'avalanche' ? avalanche : snowball

  // Months in which a debt is fully paid off (for green row highlight).
  const paidOffMonths = useMemo(() => {
    const set = new Set<number>()
    Object.values(payoffMonthByDebt(activeSchedule)).forEach((m) => set.add(m))
    return set
  }, [activeSchedule])

  // Bar chart data using the best method.
  const barData = useMemo(() => {
    const payoff = payoffMonthByDebt(best)
    const maxMonth = Math.max(1, best.monthsToPayoff)
    return debts.map((d) => ({
      name: d.name,
      month: payoff[d.name] ?? best.monthsToPayoff,
      pct: ((payoff[d.name] ?? best.monthsToPayoff) / maxMonth) * 100,
      color: colorByDebt[d.name],
    }))
  }, [best, debts, colorByDebt])

  const MethodPanel = ({
    result,
    label,
    description,
    other,
  }: {
    result: PayoffResult
    label: string
    description: string
    other: PayoffResult
  }) => {
    const saves = result.totalInterestPaid < other.totalInterestPaid
    const savedAmount = other.totalInterestPaid - result.totalInterestPaid
    return (
      <div
        className={`flex-1 rounded-card border p-5 ${
          saves ? 'border-accent bg-accent/5' : 'border-border bg-white'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-lg font-semibold text-navy">{label}</h4>
          {saves && (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              Saves more money
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{description}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Debt-free by</dt>
            <dd className="font-medium text-navy">
              {result.cappedOut ? '50+ years' : formatMonthYear(result.payoffDate)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Total interest paid</dt>
            <dd className="font-medium text-navy">
              {formatCurrency(result.totalInterestPaid)}
            </dd>
          </div>
          {savedAmount > 0.5 && (
            <div className="flex justify-between">
              <dt className="text-muted">Saved vs other method</dt>
              <dd className="font-semibold text-accent">
                {formatCurrency(savedAmount)}
              </dd>
            </div>
          )}
        </dl>
      </div>
    )
  }

  return (
    <section className="my-10">
      <h2 className="mb-6 text-[28px] font-semibold text-navy">Your results</h2>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">You&apos;ll be debt-free</p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {best.cappedOut ? '50+ years' : formatMonthYear(best.payoffDate)}
          </p>
          <p className="mt-1 text-xs text-muted">{monthsLabel(best)}</p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">Total interest paid</p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(best.totalInterestPaid)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">Total amount paid</p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(best.totalAmountPaid)}
          </p>
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold text-navy">
          Avalanche vs Snowball
        </h3>
        <div className="flex flex-col gap-4 md:flex-row">
          <MethodPanel
            result={avalanche}
            other={snowball}
            label="Avalanche"
            description="Highest interest rate first."
          />
          <MethodPanel
            result={snowball}
            other={avalanche}
            label="Snowball"
            description="Smallest balance first."
          />
        </div>
        {interestSaved > 0.5 ? (
          <p className="mt-3 text-sm text-muted">
            The <strong className="text-navy capitalize">{bestMethod}</strong>{' '}
            method saves you{' '}
            <strong className="text-accent">
              {formatCurrency(interestSaved)}
            </strong>{' '}
            in interest.
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">
            For these debts, both strategies pay off in the same order and cost
            the same.{' '}
            {debts.length <= 1
              ? 'Add more debts'
              : 'Add an extra monthly payment'}{' '}
            to see the avalanche method pull ahead.
          </p>
        )}
      </div>

      {/* Bar chart */}
      <div className="mt-8 rounded-card border border-border bg-white p-5">
        <h3 className="mb-1 text-xl font-semibold text-navy">
          Payoff sequence
        </h3>
        <p className="mb-4 text-sm text-muted">
          When each debt is cleared using the {bestMethod} method.
        </p>
        <div className="space-y-3">
          {barData.map((bar) => (
            <div key={bar.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-navy">{bar.name}</span>
                <span className="text-muted">
                  {bar.month >= 600 ? '50+ yrs' : `Month ${bar.month}`}
                </span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(bar.pct, 3)}%`,
                    backgroundColor: bar.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {barData.map((bar) => (
            <span
              key={bar.name}
              className="flex items-center gap-2 text-xs text-muted"
            >
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: bar.color }}
              />
              {bar.name}
            </span>
          ))}
        </div>
      </div>

      {/* Payment schedule (collapsible) */}
      <div className="mt-8">
        <button
          type="button"
          onClick={() => setScheduleOpen((o) => !o)}
          className="rounded-btn border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          aria-expanded={scheduleOpen}
        >
          {scheduleOpen ? 'Hide' : 'Show'} payment schedule
        </button>

        {scheduleOpen && (
          <div className="mt-4">
            <div className="mb-3 flex gap-2">
              {(['avalanche', 'snowball'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setScheduleTab(tab)}
                  className={`rounded-btn px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                    scheduleTab === tab
                      ? 'bg-navy text-white'
                      : 'border border-border text-muted hover:text-navy'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="max-h-[420px] overflow-auto rounded-card border border-border">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-surface text-muted">
                  <tr>
                    <th className="px-4 py-2 font-medium">Month</th>
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2 text-right font-medium">
                      Total Payment
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Remaining Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeSchedule.monthlySchedule.map((m) => {
                    const highlight = paidOffMonths.has(m.month)
                    return (
                      <tr
                        key={m.month}
                        className={`border-t border-border ${
                          highlight ? 'bg-accent/10' : ''
                        }`}
                      >
                        <td className="px-4 py-2">{m.month}</td>
                        <td className="px-4 py-2">
                          {formatShortDate(m.date)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {formatCurrency(m.totalPayment, 2)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {formatCurrency(m.remainingBalance, 2)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
