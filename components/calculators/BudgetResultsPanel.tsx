'use client'

import { useMemo } from 'react'
import type { BudgetResult } from '@/types/calculator'
import { formatCurrency } from '@/lib/format'

interface BudgetResultsPanelProps {
  result: BudgetResult
}

const CATEGORY_COLORS: Record<string, string> = {
  Needs: '#1B2E5E',
  Wants: '#4A6FA5',
  'Savings & extra debt payments': '#2E7D5E',
}

export default function BudgetResultsPanel({ result }: BudgetResultsPanelProps) {
  const { monthlyIncome, needs, wants, savings } = result
  const categories = [needs, wants, savings]

  const segments = useMemo(() => {
    let cursor = 0
    return categories.map((cat) => {
      const start = (cursor / 100) * 360
      cursor += cat.percent
      const end = (cursor / 100) * 360
      return { ...cat, start, end, color: CATEGORY_COLORS[cat.label] }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needs, wants, savings])

  const gradient = segments
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(', ')

  return (
    <section className="my-10">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Donut chart */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">
            Your monthly budget
          </h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div
              className="relative h-44 w-44 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${gradient})` }}
              role="img"
              aria-label="50/30/20 budget breakdown"
            >
              <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-xs text-muted">Take-home</span>
                <span className="text-sm font-bold text-navy">
                  {formatCurrency(monthlyIncome)}
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
                  <span>{s.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Category cards */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="rounded-card border border-border bg-surface p-5"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-navy">
                  {cat.label}{' '}
                  <span className="font-normal text-muted">
                    ({cat.percent}%)
                  </span>
                </p>
                <p className="text-xl font-bold text-navy">
                  {formatCurrency(cat.amount, 2)}
                </p>
              </div>
              <p className="mt-2 text-sm text-muted">
                {cat.examples.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-[13px] italic text-muted">
        The 50/30/20 rule is a general guideline, not a strict formula.
        Adjust the percentages to fit your own cost of living, goals, and
        priorities.
      </p>
    </section>
  )
}
