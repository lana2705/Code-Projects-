import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME } from '@/lib/constants'

const TITLE = 'Should I Pay Off Debt or Invest? How to Decide'
const DESCRIPTION =
  "Pay off debt or invest — it's one of the most common personal finance questions. Here's a clear framework for making the right decision based on your interest rates and situation."
const PATH = '/blog/pay-off-debt-or-invest'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: PATH,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Beacon — Free Finance Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

const ul = 'mt-3 list-disc space-y-2 pl-6 text-muted'
const ol = 'mt-3 list-decimal space-y-2 pl-6 text-muted'

const faqs: FAQItem[] = [
  {
    question: 'Should I pay off my student loans or invest?',
    answer:
      'It depends on your interest rate. Federal student loan rates in 2026 are typically 5–8%. Loans above 7% favor payoff first. Loans below 5% favor investing, especially in tax-advantaged accounts. Loans in between call for a split approach. Income-driven repayment plans and potential forgiveness programs are additional factors unique to federal student loans.',
  },
  {
    question: 'Should I pay off my mortgage or invest?',
    answer:
      'For most people with mortgage rates below 5%, investing is mathematically favorable over the long run. At current rates (which have varied significantly), this is a closer call. The psychological satisfaction of owning your home outright is a legitimate factor. Many people choose to do both — make regular mortgage payments and invest the rest.',
  },
  {
    question: 'Is it better to save or pay off debt?',
    answer:
      "Both, in the right order. A small emergency fund ($1,000) first, then high-interest debt, then a full emergency fund, then long-term saving and investing. Without any emergency savings, you'll likely return to debt the next time something unexpected happens.",
  },
  {
    question: 'What interest rate makes it worth paying off debt early?',
    answer:
      'As a rough guideline: if the interest rate is above 6–7%, prioritize paying it off over investing in the stock market. Below 4%, investing is generally favorable. Between 4–7%, personal factors and tax considerations should guide the decision.',
  },
]

export default function PayOffDebtOrInvestPost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">
        Should I Pay Off Debt or Invest?
      </h1>
      <p className="mt-2 text-sm text-muted">Published September 14, 2026</p>

      <p className="mt-6 text-lg leading-relaxed text-muted">
        This is one of the most common questions in personal finance — and
        one of the few where math gives you a clear answer most of the
        time. The short version: compare your debt&apos;s interest rate to
        your expected investment return. But the full answer involves a
        few important nuances.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        The Math-Based Answer
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Money is fungible. Paying off a debt with a 20% interest rate is
        mathematically equivalent to earning a guaranteed 20% return on an
        investment. Since no investment reliably returns 20%, paying off
        high-interest debt first is almost always the right call.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        The crossover point where this gets complicated is around 6–7% —
        roughly the long-run average return of a diversified stock market
        index fund after inflation.
      </p>
      <p className="mt-4 font-semibold text-navy">Simple framework:</p>
      <ul className={ul}>
        <li>Debt interest rate above 7%: Pay off debt first</li>
        <li>Debt interest rate below 4%: Invest the money</li>
        <li>
          Debt interest rate between 4–7%: Do both, with emphasis depending
          on your risk tolerance and emotional relationship with debt
        </li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        This is a guideline, not a law. Your personal situation — tax
        implications, employer match, emergency fund status, psychological
        stress from debt — all factor in.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Before Anything Else: The Employer Match
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        If your employer offers a 401(k) match and you&apos;re not
        contributing enough to capture it, that comes before everything
        else — before debt payoff, before emergency savings, before
        investing.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        A 50% employer match on your contribution is a guaranteed 50%
        return. No debt interest rate and no investment competes with
        that. Contribute at least enough to get the full match, then decide
        what to do with the rest.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        High-Interest Debt: Pay It Off First
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Credit cards, payday loans, and personal loans with rates above 10%
        are financial emergencies. Carrying a $10,000 credit card balance
        at 22% APR costs $2,200 in interest per year — money that
        disappears with nothing to show for it.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        No reasonable investment strategy reliably returns 22%. The stock
        market averages roughly 7–10% annually over long periods, and that
        comes with real risk. Paying off 22% debt is a guaranteed 22%
        return with zero risk.
      </p>
      <p className="mt-4 font-semibold text-navy">
        If you have high-interest debt:
      </p>
      <ul className={ul}>
        <li>Make minimum payments on everything</li>
        <li>
          Throw every extra dollar at the highest-rate debt (avalanche
          method)
        </li>
        <li>Don&apos;t invest beyond the employer match until it&apos;s gone</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        Use our{' '}
        <Link
          href="/debt-payoff-calculator"
          className="text-accent underline"
        >
          Debt Payoff Calculator
        </Link>{' '}
        to see exactly how long it will take and how much interest
        you&apos;ll save by paying extra each month.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Low-Interest Debt: Invest the Difference
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Mortgages, federal student loans, and some car loans often carry
        rates between 3–6%. At these rates, the math starts to favor
        investing.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        A mortgage at 4% costs you 4% on the outstanding balance. A
        diversified index fund has historically returned around 7–10%
        annually over long periods. If you&apos;re paying 4% and expecting
        to earn 7–10%, the gap favors investing rather than making extra
        loan payments.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        That said, &ldquo;historically returned&rdquo; is not the same as
        &ldquo;will return.&rdquo; Stock market returns are variable and
        unpredictable in any given year or decade. Debt payoff is a
        guaranteed return. Some people reasonably prefer the certainty of
        eliminating debt even when the math slightly favors investing.
      </p>
      <p className="mt-4 font-semibold text-navy">
        If you have low-interest debt:
      </p>
      <ul className={ul}>
        <li>Make your regular payments on schedule</li>
        <li>Invest the rest (after emergency fund is funded)</li>
        <li>
          Accelerate debt payoff only if the interest rate exceeds your
          expected investment return
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        The Middle Ground: 4–7% Debt
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        This is where it gets genuinely complicated because the rates are
        close enough that other factors should influence your decision.
      </p>
      <p className="mt-4 font-semibold text-navy">
        Reasons to favor debt payoff in the 4–7% range:
      </p>
      <ul className={ul}>
        <li>You hate having debt and it causes significant stress</li>
        <li>Your income is variable and debt feels risky</li>
        <li>
          You&apos;re close to a milestone (paying off the last loan,
          owning the car outright)
        </li>
        <li>You want to simplify your financial life</li>
      </ul>
      <p className="mt-4 font-semibold text-navy">
        Reasons to favor investing in the 4–7% range:
      </p>
      <ul className={ul}>
        <li>You&apos;re young and time horizon is long (compounding matters more)</li>
        <li>You have no other high-interest debt</li>
        <li>Your emergency fund is fully funded</li>
        <li>You&apos;re in a lower tax bracket (investment returns more tax-efficient)</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        Many financial planners suggest splitting the extra money: pay a
        bit extra on the debt and invest the rest. You don&apos;t have to
        choose one or the other completely.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        The Emergency Fund Complicates Things
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Before making the debt-vs-invest decision, make sure you have a
        starter emergency fund of at least $1,000 — ideally 3 months of
        essential expenses.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Without an emergency fund, an unexpected expense forces you back
        into high-interest debt regardless of how much you&apos;ve paid
        down. The emergency fund breaks the cycle.
      </p>
      <p className="mt-4 font-semibold text-navy">Priority order:</p>
      <ol className={ol}>
        <li>Employer 401(k) match (always first)</li>
        <li>Starter emergency fund ($1,000)</li>
        <li>High-interest debt payoff</li>
        <li>Full emergency fund (3–6 months)</li>
        <li>Invest and pay down moderate-interest debt simultaneously</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Tax Considerations
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Investing in tax-advantaged accounts changes the math. A Roth IRA
        contribution grows tax-free — meaning a 7% return in a Roth IRA is
        worth more than a 7% return in a taxable brokerage account. This
        can tip the scales toward investing even when debt rates are in
        the 5–6% range.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Similarly, traditional 401(k) contributions reduce your taxable
        income today, effectively giving you a discount on the
        contribution equal to your marginal tax rate.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        If you&apos;re in the 22% federal tax bracket and contribute
        $1,000 to a traditional 401(k), you save $220 in taxes
        immediately. That changes the effective cost of the contribution
        and makes investing more attractive relative to debt payoff.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        The Psychological Factor
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Math is not the only input. Personal finance is personal.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Some people carry significant psychological stress from debt — it
        affects their sleep, their relationships, and their sense of
        security. For those people, paying off debt faster than the math
        strictly requires is often worth it, because financial decisions
        you can actually stick to beat mathematically optimal decisions
        you abandon.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Others find satisfaction in watching their investment account grow
        and feel comfortable carrying low-interest debt. For them,
        investing aggressively while making minimum debt payments is
        sustainable.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Know which type of person you are. The right answer is the one
        you&apos;ll follow consistently for years.
      </p>

      <FAQAccordion items={faqs} />
    </div>
  )
}
