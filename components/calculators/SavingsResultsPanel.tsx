'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SavingsResult } from '@/types/calculator'
import { formatCurrency } from '@/lib/format'

interface SavingsResultsPanelProps {
  result: SavingsResult
}

export default function SavingsResultsPanel({
  result,
}: SavingsResultsPanelProps) {
  const { finalBalance, totalContributions, totalInterestEarned, yearlyBreakdown } =
    result
  const [scheduleOpen, setScheduleOpen] = useState(false)

  const initialDeposit = yearlyBreakdown[0]?.startBalance ?? 0
  const contributedOnly = totalContributions - initialDeposit

  const segments = useMemo(() => {
    const raw = [
      { label: 'Starting balance', value: initialDeposit, color: '#1B2E5E' },
      { label: 'Contributions', value: Math.max(contributedOnly, 0), color: '#4A6FA5' },
      { label: 'Interest earned', value: Math.max(totalInterestEarned, 0), color: '#2E7D5E' },
    ]
    const total = raw.reduce((s, seg) => s + seg.value, 0) || 1
    let cursor = 0
    return raw
      .map((seg) => {
        const start = (cursor / total) * 360
        cursor += seg.value
        const end = (cursor / total) * 360
        return { ...seg, start, end, pct: (seg.value / total) * 100 }
      })
      .filter((s) => s.value > 0)
  }, [initialDeposit, contributedOnly, totalInterestEarned])

  const gradient = segments
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(', ')

  return (
    <section className="my-10">
      {/* Hero number */}
      <div className="rounded-card border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">Your savings will grow to</p>
        <p className="mt-2 text-[40px] font-bold leading-tight text-accent">
          {formatCurrency(finalBalance, 2)}
        </p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Breakdown table */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">Breakdown</h2>
          <div className="overflow-hidden rounded-card border border-border">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-t border-border first:border-t-0">
                  <td className="px-4 py-2 text-navy">Starting balance</td>
                  <td className="px-4 py-2 text-right">
                    {formatCurrency(initialDeposit, 2)}
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2 text-navy">Total contributions</td>
                  <td className="px-4 py-2 text-right">
                    {formatCurrency(contributedOnly, 2)}
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2 text-navy">Total interest earned</td>
                  <td className="px-4 py-2 text-right">
                    {formatCurrency(totalInterestEarned, 2)}
                  </td>
                </tr>
                <tr className="border-t-2 border-border bg-accent/5">
                  <td className="px-4 py-2 font-bold text-accent">
                    Final balance
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-accent">
                    {formatCurrency(finalBalance, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Donut chart */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">
            Where your balance comes from
          </h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div
              className="relative h-44 w-44 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${gradient})` }}
              role="img"
              aria-label="Breakdown of final savings balance"
            >
              <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-xs text-muted">Final balance</span>
                <span className="text-sm font-bold text-navy">
                  {formatCurrency(finalBalance)}
                </span>
              </div>
            </div>
            <ul className="space-y-2">
              {segments.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-navy">{s.label}</span>
                  <span>{s.pct.toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Collapsible year-by-year growth table */}
      {yearlyBreakdown.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setScheduleOpen((o) => !o)}
            aria-expanded={scheduleOpen}
            className="flex w-full items-center justify-center gap-2 rounded-btn border border-border bg-surface py-2.5 text-sm font-medium text-muted transition-colors hover:text-navy"
          >
            {scheduleOpen ? 'Hide' : 'Show'} year-by-year growth
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`transition-transform ${scheduleOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {scheduleOpen && (
            <div className="mt-4 max-h-[420px] overflow-auto rounded-card border border-border">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-surface text-muted">
                  <tr>
                    <th className="px-4 py-2 font-medium">Year</th>
                    <th className="px-4 py-2 text-right font-medium">
                      Start balance
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Contributions
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Interest
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      End balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-t border-border">
                      <td className="px-4 py-2">{row.year}</td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(row.startBalance, 2)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(row.contributions, 2)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(row.interestEarned, 2)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(row.endBalance, 2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-6 text-[13px] italic text-muted">
        This is an estimate based on a fixed annual interest rate compounded
        monthly. Actual returns vary with real-world interest rate changes,
        fees, and taxes on interest earned.
      </p>
    </section>
  )
}
