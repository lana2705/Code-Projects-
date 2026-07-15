'use client'

import { useMemo } from 'react'
import type { PaycheckResult } from '@/types/calculator'
import { formatCurrency, formatPercent } from '@/lib/format'
import AdSenseSlot from '@/components/shared/AdSenseSlot'

interface PaycheckResultsPanelProps {
  result: PaycheckResult
}

const FREQUENCY_LABEL = 'per paycheck'

export default function PaycheckResultsPanel({
  result,
}: PaycheckResultsPanelProps) {
  const {
    grossPerPeriod,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    retirement401k,
    healthInsurance,
    additionalWithholding,
    netPerPeriod,
    netAnnual,
    effectiveFederalRate,
    effectiveTotalRate,
    payPeriods,
  } = result

  const annual = (perPeriod: number) => perPeriod * payPeriods
  const grossAnnual = annual(grossPerPeriod)

  // Donut segments (annual amounts).
  const segments = useMemo(() => {
    const deductions = annual(
      retirement401k + healthInsurance + additionalWithholding,
    )
    const raw = [
      { label: 'Take-home', value: netAnnual, color: '#2E7D5E' },
      { label: 'Federal tax', value: annual(federalTax), color: '#1B2E5E' },
      { label: 'State tax', value: annual(stateTax), color: '#4A6FA5' },
      {
        label: 'FICA',
        value: annual(socialSecurity + medicare),
        color: '#6B7280',
      },
      { label: 'Deductions', value: deductions, color: '#9CA3AF' },
    ]
    const total = raw.reduce((s, seg) => s + seg.value, 0) || 1
    let cursor = 0
    const withAngles = raw.map((seg) => {
      const start = (cursor / total) * 360
      cursor += seg.value
      const end = (cursor / total) * 360
      return { ...seg, start, end, pct: (seg.value / total) * 100 }
    })
    return withAngles.filter((s) => s.value > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const gradient = segments
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(', ')

  const breakdownRows = [
    { label: 'Gross pay', perPeriod: grossPerPeriod, sign: '' },
    { label: 'Federal income tax', perPeriod: federalTax, sign: '−' },
    { label: 'State income tax — est.', perPeriod: stateTax, sign: '−' },
    { label: 'Social Security 6.2%', perPeriod: socialSecurity, sign: '−' },
    { label: 'Medicare 1.45%', perPeriod: medicare, sign: '−' },
    {
      label: '401(k) contribution',
      perPeriod: retirement401k,
      sign: '−',
      hideIfZero: true,
    },
    {
      label: 'Health insurance',
      perPeriod: healthInsurance,
      sign: '−',
      hideIfZero: true,
    },
    {
      label: 'Additional withholding',
      perPeriod: additionalWithholding,
      sign: '−',
      hideIfZero: true,
    },
  ]

  return (
    <section className="my-10">
      {/* Hero number */}
      <div className="rounded-card border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">Your take-home pay</p>
        <p className="mt-2 text-[40px] font-bold leading-tight text-accent">
          {formatCurrency(netPerPeriod, 2)}
        </p>
        <p className="text-sm text-muted">{FREQUENCY_LABEL}</p>
        <p className="mt-2 text-sm text-muted">
          {formatCurrency(netAnnual)} annually
        </p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Breakdown table */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-navy">Breakdown</h3>
          <div className="overflow-hidden rounded-card border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-muted">
                <tr>
                  <th className="px-4 py-2 text-left font-medium"> </th>
                  <th className="px-4 py-2 text-right font-medium">
                    Per paycheck
                  </th>
                  <th className="px-4 py-2 text-right font-medium">Annual</th>
                </tr>
              </thead>
              <tbody>
                {breakdownRows.map((row) => {
                  if (row.hideIfZero && row.perPeriod <= 0.005) return null
                  return (
                    <tr key={row.label} className="border-t border-border">
                      <td className="px-4 py-2 text-navy">
                        {row.sign && (
                          <span className="text-muted">{row.sign} </span>
                        )}
                        {row.label}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(row.perPeriod, 2)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(annual(row.perPeriod))}
                      </td>
                    </tr>
                  )
                })}
                <tr className="border-t-2 border-border bg-accent/5">
                  <td className="px-4 py-2 font-bold text-accent">
                    Net take-home pay
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-accent">
                    {formatCurrency(netPerPeriod, 2)}
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-accent">
                    {formatCurrency(netAnnual)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Donut chart */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-navy">
            Where your money goes
          </h3>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div
              className="relative h-44 w-44 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${gradient})` }}
              role="img"
              aria-label="Breakdown of gross pay"
            >
              <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-xs text-muted">Gross</span>
                <span className="text-sm font-bold text-navy">
                  {formatCurrency(grossAnnual)}
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
                  <span>{formatPercent(s.pct)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Callout cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">Effective federal tax rate</p>
          <p className="mt-1 text-2xl font-bold text-navy">
            {formatPercent(effectiveFederalRate)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">Effective total tax rate</p>
          <p className="mt-1 text-2xl font-bold text-navy">
            {formatPercent(effectiveTotalRate)}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-[13px] italic text-muted">
        This is an estimate based on 2026 federal tax brackets and flat state
        income tax rates. Actual withholding may differ based on your W-4
        elections, deductions, and credits. Consult a tax professional for
        precise figures.
      </p>

      {/* This panel only mounts once results exist, so the ad is never
          visible before the user clicks Calculate. */}
      <AdSenseSlot slot="PAYCHECK_CALC_RESULTS" />
    </section>
  )
}
