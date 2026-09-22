'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { RetirementInputs, RetirementResult } from '@/types/calculator'
import {
  calcWorkTwoMoreYears,
  calcHigherReturnScenario,
} from '@/lib/calculators/retirement'
import { formatCurrency, formatPercent } from '@/lib/format'
import MethodologyNote from '@/components/shared/MethodologyNote'

interface RetirementResultsPanelProps {
  result: RetirementResult
  inputs: RetirementInputs
}

const STATUS_CONFIG = {
  surplus: {
    emoji: '✅',
    title: "You're on track for retirement",
    bg: '#F0FDF4',
    border: '#BBF7D0',
  },
  on_track: {
    emoji: '✅',
    title: "You're on track for retirement",
    bg: '#F0FDF4',
    border: '#BBF7D0',
  },
  slightly_behind: {
    emoji: '⚠️',
    title: "You're slightly behind",
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  significantly_behind: {
    emoji: '🔴',
    title: 'You have a retirement gap',
    bg: '#FEF2F2',
    border: '#FECACA',
  },
} as const

const MILESTONE_AGES = [35, 40, 45, 50, 55, 60, 65]

function LineChart({
  points,
}: {
  points: { age: number; balance: number; contributionsOnly: number }[]
}) {
  const width = 640
  const height = 240
  const padLeft = 64
  const padRight = 12
  const padTop = 12
  const padBottom = 28
  const innerW = width - padLeft - padRight
  const innerH = height - padTop - padBottom

  const maxVal = Math.max(...points.map((p) => p.balance), 1)
  const minAge = points[0]?.age ?? 0
  const maxAge = points[points.length - 1]?.age ?? 0
  const ageSpan = maxAge - minAge || 1

  const xScale = (age: number) => padLeft + ((age - minAge) / ageSpan) * innerW
  const yScale = (val: number) => padTop + innerH - (val / maxVal) * innerH

  const path = (key: 'balance' | 'contributionsOnly') =>
    points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.age).toFixed(1)} ${yScale(p[key]).toFixed(1)}`)
      .join(' ')

  const ageLabels: number[] = []
  for (let a = minAge; a < maxAge; a += 5) ageLabels.push(a)
  ageLabels.push(maxAge)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Projected balance versus contributions over time"
    >
      {[0, 0.5, 1].map((frac) => (
        <g key={frac}>
          <line
            x1={padLeft}
            x2={width - padRight}
            y1={yScale(maxVal * frac)}
            y2={yScale(maxVal * frac)}
            stroke="#E5E7EB"
          />
          <text
            x={padLeft - 8}
            y={yScale(maxVal * frac)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="10"
            fill="#6B7280"
          >
            {formatCurrency(maxVal * frac, 0)}
          </text>
        </g>
      ))}
      {ageLabels.map((a) => (
        <text
          key={a}
          x={xScale(a)}
          y={height - 10}
          textAnchor="middle"
          fontSize="10"
          fill="#6B7280"
        >
          {a}
        </text>
      ))}
      <path d={path('contributionsOnly')} fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 3" />
      <path d={path('balance')} fill="none" stroke="#1B2E5E" strokeWidth="2.5" />
    </svg>
  )
}

export default function RetirementResultsPanel({
  result,
  inputs,
}: RetirementResultsPanelProps) {
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [milestonesOpen, setMilestonesOpen] = useState(false)

  const {
    projectedBalance,
    projectedBalanceInTodaysDollars,
    yearsToRetirement,
    totalContributions,
    totalEmployerMatch,
    totalGrowth,
    requiredNestEgg,
    estimatedMonthlyWithdrawal,
    socialSecurityMonthly,
    totalMonthlyIncome,
    desiredMonthlyIncomeNominal,
    onTrackStatus,
    fundingPercentage,
    additionalMonthlySavingsNeeded,
    retireEarlierAge,
    yearlyProjections,
  } = result

  const status = STATUS_CONFIG[onTrackStatus]
  const retirementAgeLabel = inputs.currentAge + yearsToRetirement

  // Growth attributable to the starting balance compounding alone, vs. growth
  // attributable to contributions — used only to split the donut chart.
  const currentSavingsGrowth = useMemo(() => {
    const monthlyReturn = inputs.expectedAnnualReturn / 12
    const alone = inputs.currentSavings * Math.pow(1 + monthlyReturn, yearsToRetirement * 12)
    return Math.max(0, alone - inputs.currentSavings)
  }, [inputs.currentSavings, inputs.expectedAnnualReturn, yearsToRetirement])

  const investmentGainsOnContributions = Math.max(0, totalGrowth - currentSavingsGrowth)

  const segments = useMemo(() => {
    const raw = [
      { label: 'Current savings growth', value: currentSavingsGrowth, color: '#1B2E5E' },
      { label: 'Your future contributions', value: totalContributions, color: '#2E7D5E' },
      { label: 'Employer match', value: totalEmployerMatch, color: '#4A6FA5' },
      {
        label: 'Investment gains on contributions',
        value: investmentGainsOnContributions,
        color: '#9CA3AF',
      },
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
      .filter((s) => s.value > 0.5)
  }, [currentSavingsGrowth, totalContributions, totalEmployerMatch, investmentGainsOnContributions])

  const gradient = segments.map((s) => `${s.color} ${s.start}deg ${s.end}deg`).join(', ')

  const chartPoints = useMemo(() => {
    let cumMatch = 0
    const points = yearlyProjections.map((y) => {
      cumMatch += y.annualEmployerMatch
      return {
        age: y.age,
        balance: y.balance,
        contributionsOnly: inputs.currentSavings + y.cumulativeContributions + cumMatch,
      }
    })
    return [
      { age: inputs.currentAge, balance: inputs.currentSavings, contributionsOnly: inputs.currentSavings },
      ...points,
    ]
  }, [yearlyProjections, inputs.currentAge, inputs.currentSavings])

  const milestones = useMemo(() => {
    const ages = Array.from(
      new Set([...MILESTONE_AGES, retirementAgeLabel].filter((a) => a >= inputs.currentAge && a <= retirementAgeLabel)),
    ).sort((a, b) => a - b)
    if (!ages.includes(inputs.currentAge)) ages.unshift(inputs.currentAge)
    return ages.map((age) => {
      if (age === inputs.currentAge) {
        return { age, balance: inputs.currentSavings, isCurrent: true, isFinal: age === retirementAgeLabel }
      }
      const row = yearlyProjections.find((y) => y.age === age)
      return { age, balance: row?.balance ?? 0, isCurrent: false, isFinal: age === retirementAgeLabel }
    })
  }, [inputs.currentAge, inputs.currentSavings, retirementAgeLabel, yearlyProjections])

  const hasGap = additionalMonthlySavingsNeeded > 0
  const canRetireEarlier = fundingPercentage >= 1.1 && retireEarlierAge !== null

  const workTwoMore = useMemo(() => (hasGap ? calcWorkTwoMoreYears(inputs) : null), [hasGap, inputs])
  const higherReturn = useMemo(() => (hasGap ? calcHigherReturnScenario(inputs) : null), [hasGap, inputs])

  const employerMatchAnnual = inputs.annualIncome * inputs.employerMatchRate

  return (
    <section className="my-10">
      {/* Status banner */}
      <div
        className="rounded-[8px] border px-6 py-5"
        style={{ backgroundColor: status.bg, borderColor: status.border }}
      >
        <p className="font-semibold text-navy">
          {status.emoji} {status.title}
        </p>
        <p className="mt-2 text-sm text-navy">
          Your projected savings cover {formatPercent(fundingPercentage * 100, 0)} of
          your retirement income goal.
        </p>
      </div>

      {/* Hero */}
      <div className="mt-6 rounded-card border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">Your projected retirement balance</p>
        <p className="mt-2 text-[40px] font-bold leading-tight text-accent">
          {formatCurrency(projectedBalance, 0)}
        </p>
        <p className="text-sm text-muted">at age {retirementAgeLabel}</p>
        <p className="mt-3 text-sm text-muted">
          ≈ {formatCurrency(projectedBalanceInTodaysDollars, 0)} in today&apos;s
          dollars (adjusted for {formatPercent(inputs.inflationRate * 100, 1)}{' '}
          inflation)
        </p>
      </div>
      <p className="mt-3 text-[13px] italic text-muted">
        For reference only: in future dollars, your desired income of{' '}
        {formatCurrency(inputs.desiredMonthlyIncome, 0)}/month will be
        approximately {formatCurrency(desiredMonthlyIncomeNominal, 0)}/month at
        retirement.
      </p>

      {/* Income analysis */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-navy">
          Will your savings last?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-surface p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Goal calculation (annuity model)
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Monthly income goal (today&apos;s $)</dt>
                <dd className="font-medium text-navy">
                  {formatCurrency(inputs.desiredMonthlyIncome, 0)}/mo
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">From savings needed</dt>
                <dd className="font-medium text-navy">
                  {formatCurrency(
                    Math.max(0, inputs.desiredMonthlyIncome - socialSecurityMonthly),
                    0,
                  )}
                  /mo
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Social Security (today&apos;s $)</dt>
                <dd className="font-medium text-navy">
                  {formatCurrency(socialSecurityMonthly, 0)}/mo
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="text-muted">Required nest egg</dt>
                <dd className="font-medium text-navy">
                  {formatCurrency(requiredNestEgg, 0)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Your projected balance (today&apos;s $)</dt>
                <dd className="font-medium text-navy">
                  {formatCurrency(projectedBalanceInTodaysDollars, 0)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="font-semibold text-navy">Funded</dt>
                <dd
                  className="font-bold"
                  style={{ color: fundingPercentage >= 1 ? '#2E7D5E' : '#DC2626' }}
                >
                  {formatPercent(fundingPercentage * 100, 0)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-card border border-border bg-surface p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Income estimate (4% withdrawal guideline)
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Estimated monthly withdrawal</dt>
                <dd className="font-medium text-navy">
                  {formatCurrency(estimatedMonthlyWithdrawal, 0)}/mo
                </dd>
              </div>
              <p className="text-xs italic text-muted">
                4% of {formatCurrency(projectedBalanceInTodaysDollars, 0)} ÷ 12 —
                rule of thumb
              </p>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="text-muted">Social Security</dt>
                <dd className="font-medium text-navy">
                  {formatCurrency(socialSecurityMonthly, 0)}/mo
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="font-semibold text-navy">Total monthly income (est.)</dt>
                <dd className="font-bold text-navy">
                  {formatCurrency(totalMonthlyIncome, 0)}/mo
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="mt-3 text-[13px] italic text-muted">
          Goal calculation: finite-period annuity model based on your selected
          retirement duration. Income estimate: 4% withdrawal guideline, shown
          as a separate rule-of-thumb estimate. These two methodologies use
          different assumptions and will produce different numbers.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Retirement savings
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(projectedBalance, 0)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            You contribute
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(totalContributions, 0)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Growth from investing
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(totalGrowth, 0)}
          </p>
        </div>
      </div>

      {/* Donut + line chart */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">
            Where your balance comes from
          </h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div
              className="relative h-44 w-44 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${gradient})` }}
              role="img"
              aria-label="Breakdown of projected retirement balance"
            >
              <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-xs text-muted">Balance</span>
                <span className="text-sm font-bold text-navy">
                  {formatCurrency(projectedBalance, 0)}
                </span>
              </div>
            </div>
            <ul className="space-y-2">
              {segments.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-sm text-muted">
                  <span
                    className="inline-block h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-navy">{s.label}</span>
                  <span>{s.pct.toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">
            Balance vs. contributions over time
          </h2>
          <LineChart points={chartPoints} />
          <div className="mt-3 flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-4 bg-navy" /> Total balance
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-4"
                style={{ backgroundImage: 'repeating-linear-gradient(90deg, #9CA3AF 0 3px, transparent 3px 6px)' }}
              />
              Contributions only
            </span>
          </div>
        </div>
      </div>

      {/* Gap analysis / retire earlier */}
      {hasGap && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-navy">How to close the gap</h2>
          <p className="mb-4 text-sm text-muted">
            To fully fund your retirement goal, you need one of these:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-border bg-surface p-5">
              <p className="font-semibold text-navy">
                Save {formatCurrency(additionalMonthlySavingsNeeded, 0)} more/month
              </p>
              <p className="mt-1 text-sm text-muted">Closes the gap by retirement.</p>
            </div>
            {workTwoMore && (
              <div className="rounded-card border border-border bg-surface p-5">
                <p className="font-semibold text-navy">
                  Work 2 more years → retire at {workTwoMore.retireAtAge}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {formatPercent(workTwoMore.fundingPercentage * 100, 0)} funded
                </p>
              </div>
            )}
            {higherReturn && (
              <div className="rounded-card border border-border bg-surface p-5">
                <p className="font-semibold text-navy">
                  Expect a {formatPercent(higherReturn.scenarioReturn * 100, 1)} return
                </p>
                <p className="mt-1 text-sm text-muted">
                  Raises your balance to{' '}
                  {formatCurrency(higherReturn.projectedBalanceInTodaysDollars, 0)} in
                  today&apos;s dollars ({formatPercent(higherReturn.fundingPercentage * 100, 0)}{' '}
                  funded)
                </p>
              </div>
            )}
          </div>
          <p className="mt-3 text-[13px] italic text-muted">
            This is an illustrative scenario. A higher return assumption is not a
            recommendation — actual returns depend on your asset allocation and
            market conditions.
          </p>
        </div>
      )}

      {canRetireEarlier && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-navy">
            Could you retire earlier?
          </h2>
          <div className="rounded-card border border-border bg-surface p-5">
            <p className="text-sm text-navy">
              At your current savings rate, you could potentially retire at age{' '}
              <strong>{retireEarlierAge}</strong> —{' '}
              {retirementAgeLabel - (retireEarlierAge ?? retirementAgeLabel)} years
              earlier than planned.
            </p>
          </div>
          <p className="mt-3 text-[13px] italic text-muted">
            Social Security benefits vary by claiming age. Visit ssa.gov/myaccount
            for your personalized estimate.
          </p>
        </div>
      )}

      {/* Employer match alert */}
      {inputs.employerMatchRate > 0 && (
        <div
          className="mt-8 rounded-[8px] border px-6 py-5"
          style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}
        >
          <p className="text-sm text-navy">
            💡 Your employer match adds{' '}
            <strong>{formatCurrency(employerMatchAnnual, 0)}/year</strong> — don&apos;t
            leave it on the table. Check your plan documents to confirm
            you&apos;re contributing enough to capture the full match.
          </p>
        </div>
      )}

      {/* Milestones */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setMilestonesOpen((o) => !o)}
          aria-expanded={milestonesOpen}
          className="flex w-full items-center justify-center gap-2 rounded-btn border border-border bg-surface py-2.5 text-sm font-medium text-muted transition-colors hover:text-navy"
        >
          {milestonesOpen ? 'Hide' : 'Show'} savings milestones
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform ${milestonesOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {milestonesOpen && (
          <div className="mt-4 overflow-hidden rounded-card border border-border">
            <table className="w-full text-sm">
              <tbody>
                {milestones.map((m) => (
                  <tr
                    key={m.age}
                    className={`border-t border-border first:border-t-0 ${
                      m.isCurrent ? 'bg-accent/5' : ''
                    }`}
                  >
                    <td className="px-4 py-2 text-navy">
                      Age {m.age}
                      {m.isCurrent && (
                        <span className="ml-2 text-xs font-semibold text-accent">
                          ← You are here
                        </span>
                      )}
                      {m.isFinal && (
                        <span className="ml-2 text-xs font-semibold text-navy">🏁</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right font-medium text-navy">
                      {formatCurrency(m.balance, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Year-by-year table */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setScheduleOpen((o) => !o)}
          aria-expanded={scheduleOpen}
          className="flex w-full items-center justify-center gap-2 rounded-btn border border-border bg-surface py-2.5 text-sm font-medium text-muted transition-colors hover:text-navy"
        >
          {scheduleOpen ? 'Hide' : 'Show'} year-by-year projections
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
                  <th className="px-4 py-2 font-medium">Age</th>
                  <th className="px-4 py-2 font-medium">Year</th>
                  <th className="px-4 py-2 text-right font-medium">Balance</th>
                  <th className="px-4 py-2 text-right font-medium">Your Contributions</th>
                  <th className="px-4 py-2 text-right font-medium">Employer Match</th>
                  <th className="px-4 py-2 text-right font-medium">Investment Growth</th>
                  <th className="px-4 py-2 text-right font-medium">Today&apos;s Dollars</th>
                </tr>
              </thead>
              <tbody>
                {yearlyProjections.map((y) => (
                  <tr key={y.age} className="border-t border-border">
                    <td className="px-4 py-2">{y.age}</td>
                    <td className="px-4 py-2">{y.year}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(y.balance, 0)}</td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(y.annualContribution, 0)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(y.annualEmployerMatch, 0)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(y.annualGrowth, 0)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(y.balanceInTodaysDollars, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <MethodologyNote>
        <p>
          This calculator projects your retirement savings using compound
          interest applied to both your current balance and future
          contributions.
        </p>
        <p className="mt-3">
          Projected balance: We simulate your savings year by year from today
          to retirement. Your current balance compounds monthly at the
          expected return. Contributions (yours plus employer match) are
          added each month and increase annually with inflation — so a
          $500/month contribution today grows each year to preserve its
          purchasing power. The final simulated balance is what&apos;s shown
          in the hero and used in all other calculations.
        </p>
        <p className="mt-3">
          Goal calculation (annuity model): We calculate how much you need at
          retirement to fund your desired monthly income for the number of
          years you plan to be in retirement. Your desired income and Social
          Security estimate are kept in today&apos;s dollars, and we use the
          real return rate (nominal return minus inflation) to account for
          inflation during retirement. This drives the required nest egg and
          the on-track assessment.
        </p>
        <p className="mt-3">
          Income estimate (4% withdrawal guideline): Separately, we apply the
          4% rule as a supplementary rule-of-thumb estimate: 4% of your
          projected balance (in today&apos;s dollars) per year, divided by
          12. This is a widely cited guideline, not a guarantee. It uses a
          different methodology than the annuity-based goal calculation, so
          the two numbers will differ.
        </p>
        <p className="mt-3">
          These are two separate estimates. The goal calculation determines
          whether you&apos;re on track. The 4% income estimate is provided
          for reference.
        </p>
        <p className="mt-3">
          Inflation adjustment: All dollar amounts shown &ldquo;in today&apos;s
          dollars&rdquo; are divided by the compounded inflation factor over
          your years to retirement, so you can compare future amounts to
          your current cost of living. Nominal (future-dollar) equivalents
          are shown separately for reference.
        </p>
        <p className="mt-3">
          Social Security: If entered, your Social Security estimate is in
          today&apos;s dollars and is subtracted from your monthly income
          goal to determine the income your savings must cover. Your actual
          Social Security benefit depends on your earnings history and
          claiming age.
        </p>
        <p className="mt-3">
          Limitations: This calculator assumes a constant annual return and
          inflation rate. Real markets fluctuate. Results are projections,
          not guarantees.
        </p>
        <p className="mt-3 italic">Last updated: September 2026</p>
      </MethodologyNote>
    </section>
  )
}
