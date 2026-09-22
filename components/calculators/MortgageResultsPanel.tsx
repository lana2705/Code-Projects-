'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { MortgageInputs, MortgageResult } from '@/types/calculator'
import { compareExtraPayment, formatYearsAndMonths } from '@/lib/calculators/mortgage'
import { formatCurrency, formatMonthYear, formatShortDate, parseCurrencyInput } from '@/lib/format'
import CurrencyInput from '@/components/shared/CurrencyInput'
import MethodologyNote from '@/components/shared/MethodologyNote'

interface MortgageResultsPanelProps {
  result: MortgageResult
  inputs: MortgageInputs
}

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'

interface AnnualBucket {
  year: number
  principal: number
  interest: number
  pmi: number
  endBalance: number
}

export default function MortgageResultsPanel({
  result,
  inputs,
}: MortgageResultsPanelProps) {
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [scheduleView, setScheduleView] = useState<'monthly' | 'annual'>('monthly')
  const [extraPayment, setExtraPayment] = useState('')

  const {
    loanAmount,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHOA,
    estimatedMonthlyPMI,
    firstMonthPrincipal,
    firstMonthInterest,
    totalMonthlyPayment,
    totalInterestPaid,
    totalMortgagePayments,
    payoffDate,
    pmiDisplayedTerminationMonth,
    pmiDisplayedTerminationDate,
    pmiScheduledCancellationDate,
    amortizationSchedule,
  } = result

  const pmiApplies = estimatedMonthlyPMI > 0.005

  const segments = useMemo(() => {
    const raw = [
      { label: 'Principal', value: firstMonthPrincipal, color: '#1B2E5E' },
      { label: 'Interest', value: firstMonthInterest, color: '#2E5EA6' },
      { label: 'Property tax', value: monthlyPropertyTax, color: '#4A6FA5' },
      { label: 'Insurance', value: monthlyInsurance, color: '#6B7280' },
      { label: 'Estimated PMI', value: estimatedMonthlyPMI, color: '#E07B54' },
      { label: 'HOA', value: monthlyHOA, color: '#9CA3AF' },
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
      .filter((s) => s.value > 0.005)
  }, [
    firstMonthPrincipal,
    firstMonthInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    estimatedMonthlyPMI,
    monthlyHOA,
  ])

  const gradient = segments
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(', ')

  const breakdownRows = [
    { label: 'Principal (first month)', value: firstMonthPrincipal, always: true },
    { label: 'Interest (first month)', value: firstMonthInterest, always: true },
    { label: 'Property tax (est.)', value: monthlyPropertyTax, always: false },
    { label: 'Home insurance (est.)', value: monthlyInsurance, always: false },
    { label: 'HOA', value: monthlyHOA, always: false },
    { label: 'Estimated PMI', value: estimatedMonthlyPMI, always: false },
  ]

  const extraAmount = parseCurrencyInput(extraPayment) || 0
  const extraComparison = useMemo(() => {
    if (extraAmount <= 0) return null
    return compareExtraPayment(result, inputs, extraAmount)
  }, [extraAmount, result, inputs])

  const earlierPmiEligibility =
    pmiApplies &&
    extraComparison?.actualCancellationEligibleDateWithExtraPayments &&
    pmiScheduledCancellationDate &&
    extraComparison.actualCancellationEligibleDateWithExtraPayments.getTime() <
      pmiScheduledCancellationDate.getTime()
      ? extraComparison.actualCancellationEligibleDateWithExtraPayments
      : null

  const annualSchedule = useMemo(() => {
    const years: AnnualBucket[] = []
    let bucket: AnnualBucket | null = null
    amortizationSchedule.forEach((m) => {
      const yearIndex = Math.floor((m.month - 1) / 12) + 1
      if (!bucket || bucket.year !== yearIndex) {
        if (bucket) years.push(bucket)
        bucket = { year: yearIndex, principal: 0, interest: 0, pmi: 0, endBalance: 0 }
      }
      bucket.principal += m.principal
      bucket.interest += m.interest
      bucket.pmi += m.estimatedPMI
      bucket.endBalance = m.remainingBalance
    })
    if (bucket) years.push(bucket)
    return years
  }, [amortizationSchedule])

  return (
    <section className="my-10">
      {/* Hero */}
      <div className="rounded-card border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">Your estimated monthly payment</p>
        <p className="mt-2 text-[40px] font-bold leading-tight text-accent">
          {formatCurrency(totalMonthlyPayment, 0)}
        </p>
        <p className="text-sm text-muted">per month</p>
      </div>

      {/* Breakdown table + donut chart, side by side */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">
            First month&apos;s payment breakdown
          </h2>
          <div className="overflow-hidden rounded-card border border-border">
            <table className="w-full text-sm">
              <tbody>
                {breakdownRows
                  .filter((row) => row.always || row.value > 0.005)
                  .map((row) => (
                    <tr
                      key={row.label}
                      className="border-t border-border first:border-t-0"
                    >
                      <td className="px-4 py-2 text-navy">{row.label}</td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(row.value, 0)}
                      </td>
                    </tr>
                  ))}
                <tr className="border-t-2 border-border bg-accent/5">
                  <td className="px-4 py-2 font-bold text-accent">Total</td>
                  <td className="px-4 py-2 text-right font-bold text-accent">
                    {formatCurrency(totalMonthlyPayment, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[13px] italic text-muted">
            The principal/interest split shifts every month — see the
            amortization schedule below.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">
            First month&apos;s payment breakdown
          </h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div
              className="relative h-44 w-44 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${gradient})` }}
              role="img"
              aria-label="Breakdown of first month's mortgage payment"
            >
              <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-xs text-muted">Total</span>
                <span className="text-sm font-bold text-navy">
                  {formatCurrency(totalMonthlyPayment)}
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

      {/* Summary cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Loan amount
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(loanAmount)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Total interest paid
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(totalInterestPaid)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Payoff date
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatMonthYear(payoffDate)}
          </p>
        </div>
        <div
          className="rounded-card border border-border bg-surface p-5"
          title="Principal + interest payments only. Does not include property tax, insurance, or HOA."
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Total mortgage payments
          </p>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(totalMortgagePayments)}
          </p>
        </div>
      </div>

      {/* PMI alert banner */}
      {pmiApplies && pmiDisplayedTerminationDate && (
        <div
          className="mt-8 rounded-[8px] border px-6 py-5"
          style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}
        >
          <p className="font-semibold text-navy">
            💡 Estimated PMI cancellation eligibility
          </p>
          <p className="mt-3 text-sm text-navy">
            Estimated automatic PMI termination:{' '}
            <strong>{formatMonthYear(pmiDisplayedTerminationDate)}</strong>
          </p>
          <p className="mt-3 text-sm text-muted">
            Under federal law, PMI on a conventional mortgage generally must
            automatically terminate when the loan is scheduled to reach 78%
            of the property&apos;s original value, provided you are current
            on payments.
          </p>
          {pmiScheduledCancellationDate && (
            <p className="mt-3 text-sm text-muted">
              You may be eligible to request cancellation as early as{' '}
              <strong className="text-navy">
                {formatMonthYear(pmiScheduledCancellationDate)}
              </strong>{' '}
              (when the scheduled balance reaches 80% of the original home
              value), subject to lender requirements and payment history.
            </p>
          )}
          <p className="mt-3 text-xs italic text-muted">
            These are estimates based on your inputs. Actual PMI dates are
            determined by your loan servicer. These rules generally apply to
            conventional mortgages under the Homeowners Protection Act — FHA
            and VA loans have different mortgage insurance rules.
          </p>
        </div>
      )}

      {/* Extra payment scenario */}
      <div
        className="mt-8 rounded-card border border-border p-5"
        style={{ backgroundColor: '#F8FAFC' }}
      >
        <h2 className="text-lg font-semibold text-navy">
          What if I pay extra each month?
        </h2>
        <div className="mt-3 max-w-xs">
          <CurrencyInput
            aria-label="Extra monthly payment"
            placeholder="$0.00"
            value={extraPayment}
            onChange={setExtraPayment}
            className={inputClass}
          />
          <p className="mt-1 text-xs italic text-[#9CA3AF]">
            Applied to principal only.
          </p>
        </div>
        {extraComparison && extraComparison.monthsSaved > 0 && (
          <div className="mt-4 text-sm">
            <p className="text-navy">
              With {formatCurrency(extraAmount, 0)} extra/month toward
              principal:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted">
              <li>
                Pay off {formatYearsAndMonths(extraComparison.monthsSaved)}{' '}
                earlier ({formatMonthYear(extraComparison.payoffDate)} instead
                of {formatMonthYear(payoffDate)})
              </li>
              <li>
                Save {formatCurrency(extraComparison.interestSaved)} in
                interest
              </li>
              {earlierPmiEligibility && (
                <li>
                  May be eligible to request PMI removal{' '}
                  {formatMonthYear(earlierPmiEligibility)}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Amortization schedule */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setScheduleOpen((o) => !o)}
          aria-expanded={scheduleOpen}
          className="flex w-full items-center justify-center gap-2 rounded-btn border border-border bg-surface py-2.5 text-sm font-medium text-muted transition-colors hover:text-navy"
        >
          {scheduleOpen ? 'Hide' : 'Show'} amortization schedule
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform ${scheduleOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {scheduleOpen && (
          <div className="mt-4">
            <div className="mb-3 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setScheduleView('monthly')}
                className={`rounded-full px-3 py-1 font-medium ${
                  scheduleView === 'monthly'
                    ? 'bg-navy text-white'
                    : 'bg-surface text-muted'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setScheduleView('annual')}
                className={`rounded-full px-3 py-1 font-medium ${
                  scheduleView === 'annual'
                    ? 'bg-navy text-white'
                    : 'bg-surface text-muted'
                }`}
              >
                Annual
              </button>
            </div>
            <div className="max-h-[420px] overflow-auto rounded-card border border-border">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-surface text-muted">
                  <tr>
                    <th className="px-4 py-2 font-medium">
                      {scheduleView === 'monthly' ? 'Month' : 'Year'}
                    </th>
                    {scheduleView === 'monthly' && (
                      <th className="px-4 py-2 font-medium">Date</th>
                    )}
                    <th
                      className="px-4 py-2 text-right font-medium"
                      title="P&I + estimated PMI. Property tax, insurance, and HOA are not included."
                    >
                      Payment
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Principal
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Interest
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Est. PMI
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleView === 'monthly'
                    ? amortizationSchedule.map((m) => {
                        const isPmiEndMonth =
                          pmiDisplayedTerminationMonth === m.month
                        return (
                          <tr
                            key={m.month}
                            className={`border-t border-border ${
                              isPmiEndMonth ? 'bg-[#FDECE1]' : ''
                            }`}
                          >
                            <td className="px-4 py-2">{m.month}</td>
                            <td className="px-4 py-2">
                              {formatShortDate(m.date)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {formatCurrency(m.payment, 2)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {formatCurrency(m.principal, 2)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {formatCurrency(m.interest, 2)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {formatCurrency(m.estimatedPMI, 2)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {formatCurrency(m.remainingBalance, 2)}
                              {isPmiEndMonth && (
                                <span className="ml-2 text-xs font-semibold text-[#E07B54]">
                                  Estimated PMI ends
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    : annualSchedule.map((y) => (
                        <tr key={y.year} className="border-t border-border">
                          <td className="px-4 py-2">Year {y.year}</td>
                          <td className="px-4 py-2 text-right">
                            {formatCurrency(y.principal + y.interest + y.pmi, 2)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {formatCurrency(y.principal, 2)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {formatCurrency(y.interest, 2)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {formatCurrency(y.pmi, 2)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {formatCurrency(y.endBalance, 2)}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <MethodologyNote>
        <p>
          This calculator estimates your monthly payment for a conventional
          fixed-rate mortgage using the standard amortization formula, which
          produces a fixed monthly payment that pays off the loan in equal
          installments over the loan term.
        </p>
        <p className="mt-3">
          Monthly principal and interest is calculated from your loan amount
          (home price minus down payment), interest rate, and loan term. The
          split between principal and interest changes every month — early
          payments are mostly interest; later payments are mostly principal.
          The first month&apos;s breakdown is shown in the payment summary.
        </p>
        <p className="mt-3">
          Property tax, insurance, HOA, and estimated PMI are added to the
          base P&amp;I payment to produce the total monthly payment. These are
          estimates based on values you enter and do not represent actual
          lender quotes.
        </p>
        <p className="mt-3">
          &ldquo;Total mortgage payments&rdquo; equals loan amount plus total
          interest — the actual cost of borrowing. Property taxes and
          insurance are ongoing ownership costs, not borrowing costs, and are
          not included in that figure.
        </p>
        <p className="mt-3">
          Estimated PMI is calculated as a fixed percentage of the original
          loan amount. Actual PMI rates vary based on credit score, LTV
          ratio, loan amount, and the insurer — the 0.5% default is a common
          starting estimate, not a quote. PMI cancellation eligibility is
          based on the original home value, not current market value.
        </p>
        <p className="mt-3">PMI scheduled dates are based on the original amortization schedule:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Scheduled cancellation eligibility: when the scheduled balance
            reaches 80% of the original home value (you may request removal,
            subject to lender requirements).
          </li>
          <li>
            Estimated automatic termination: when the scheduled balance
            reaches 78% of the original home value; lenders must
            automatically cancel PMI at this point, assuming payments are
            current. Extra payments do not move this statutory date forward.
          </li>
          <li>Midpoint rule: PMI must also terminate after the midpoint of the loan term.</li>
        </ul>
        <p className="mt-3">
          If you make extra payments, the calculator shows when your actual
          balance may reach 80% LTV — potentially earlier than the scheduled
          cancellation date.
        </p>
        <p className="mt-3">
          Extra payments are applied to principal only and do not reduce
          taxes, insurance, or HOA. The calculator re-runs a full
          month-by-month amortization to determine the new payoff date and
          estimated interest savings.
        </p>
        <p className="mt-3">
          These are estimates for informational purposes. Actual PMI dates
          are determined by your loan servicer. This calculator assumes a
          conventional fixed-rate mortgage. Results differ for ARMs, FHA, VA,
          USDA, and jumbo loans.
        </p>
        <p className="mt-3 italic">Last updated: September 2026</p>
      </MethodologyNote>
    </section>
  )
}
