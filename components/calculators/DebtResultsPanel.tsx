'use client'

import { useMemo, useState } from 'react'
import { Lightbulb, ChevronDown } from 'lucide-react'
import type { Debt, PayoffResult } from '@/types/calculator'
import {
  type DebtComparison,
  recommendFirstDebt,
  formatMonths,
} from '@/lib/calculators/debtPayoff'
import { formatCurrency, formatShortDate } from '@/lib/format'

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

export default function DebtResultsPanel({
  comparison,
  debts,
}: DebtResultsPanelProps) {
  const { avalanche, snowball, bestMethod, interestSaved } = comparison
  const best = bestMethod === 'avalanche' ? avalanche : snowball

  const [scheduleOpen, setScheduleOpen] = useState(false)

  const recommendation = useMemo(() => recommendFirstDebt(debts), [debts])

  const colorByDebt = useMemo(() => {
    const map: Record<string, string> = {}
    debts.forEach((d, i) => {
      map[d.name] = DEBT_COLORS[i % DEBT_COLORS.length]
    })
    return map
  }, [debts])

  // Bar chart + schedule are based on the best (lowest-interest) method.
  const paidOffMonths = useMemo(() => {
    const set = new Set<number>()
    Object.values(payoffMonthByDebt(best)).forEach((m) => set.add(m))
    return set
  }, [best])

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
    otherLabel,
  }: {
    result: PayoffResult
    label: string
    description: string
    other: PayoffResult
    otherLabel: string
  }) => {
    const saves = result.totalInterestPaid < other.totalInterestPaid
    const savedAmount = Math.round(
      other.totalInterestPaid - result.totalInterestPaid,
    )
    return (
      <div
        className={`rounded-card border p-4 ${
          saves ? 'border-2 border-accent bg-accent/5' : 'border-border bg-white'
        }`}
      >
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-navy">{label}</h4>
          {saves && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
              Saves more money
            </span>
          )}
        </div>
        <p className="mb-3 mt-0.5 text-xs text-muted">{description}</p>
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Debt-free by</dt>
            <dd className="font-medium text-navy">
              {result.cappedOut
                ? '50+ years'
                : formatShortDate(result.payoffDate)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Time to payoff</dt>
            <dd className="font-medium text-navy">
              {result.cappedOut
                ? '50+ years'
                : `${result.monthsToPayoff} months`}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Total interest</dt>
            <dd className="font-medium text-navy">
              {formatCurrency(result.totalInterestPaid)}
            </dd>
          </div>
        </dl>
        {saves && savedAmount > 0 && (
          <p className="mt-3 text-xs font-semibold text-accent">
            ✓ Saves {formatCurrency(savedAmount)} vs {otherLabel}
          </p>
        )}
      </div>
    )
  }

  return (
    <section className="my-10">
      {/* Tip banner */}
      {recommendation && (
        <div className="mb-6 flex items-start gap-3 rounded-card border border-accent bg-accent/5 p-4">
          <Lightbulb className="mt-0.5 shrink-0 text-accent" size={20} />
          <p className="text-sm text-navy">
            <strong className="font-semibold">
              Pay off {recommendation.debt.name} first.
            </strong>{' '}
            {recommendation.reason}
          </p>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            You&apos;ll be debt-free
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {best.cappedOut ? '50+ years' : formatShortDate(best.payoffDate)}
          </p>
          <p className="mt-1 text-xs text-muted">
            {best.cappedOut
              ? ''
              : `${best.monthsToPayoff} months · ${formatMonths(
                  best.monthsToPayoff,
                )}`}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Total interest paid
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(best.totalInterestPaid)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Total amount paid
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(best.totalAmountPaid)}
          </p>
        </div>
      </div>

      {/* Avalanche vs Snowball comparison */}
      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold text-navy">
          Avalanche vs snowball
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <MethodPanel
            result={avalanche}
            other={snowball}
            otherLabel="snowball"
            label="Avalanche"
            description="Highest interest rate first"
          />
          <MethodPanel
            result={snowball}
            other={avalanche}
            otherLabel="avalanche"
            label="Snowball"
            description="Smallest balance first"
          />
        </div>
        {interestSaved <= 0.5 && (
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

      {/* Collapsible payment schedule (with payoff-sequence chart inside) */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setScheduleOpen((o) => !o)}
          aria-expanded={scheduleOpen}
          className="flex w-full items-center justify-center gap-2 rounded-btn border border-border bg-surface py-2.5 text-sm font-medium text-muted transition-colors hover:text-navy"
        >
          {scheduleOpen ? 'Hide' : 'Show'} payment schedule
          <ChevronDown
            size={16}
            className={`transition-transform ${scheduleOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {scheduleOpen && (
          <div className="mt-4 space-y-6">
            {/* Payoff sequence chart */}
            <div className="rounded-card border border-border bg-white p-5">
              <h3 className="mb-1 text-base font-semibold text-navy">
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

            {/* Schedule table (best method) */}
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
                  {best.monthlySchedule.map((m) => {
                    const highlight = paidOffMonths.has(m.month)
                    return (
                      <tr
                        key={m.month}
                        className={`border-t border-border ${
                          highlight ? 'bg-accent/10' : ''
                        }`}
                      >
                        <td className="px-4 py-2">{m.month}</td>
                        <td className="px-4 py-2">{formatShortDate(m.date)}</td>
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
