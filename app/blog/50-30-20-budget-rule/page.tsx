import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME } from '@/lib/constants'

const TITLE = 'What Is the 50/30/20 Budget Rule?'
const DESCRIPTION =
  "The 50/30/20 budget rule divides your take-home pay into needs, wants, and savings. Here's how it works, whether it's realistic, and how to adapt it to your life."
const PATH = '/blog/50-30-20-budget-rule'

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

const faqs: FAQItem[] = [
  {
    question: 'What if my needs are more than 50%?',
    answer:
      "That's common, especially in high-cost cities. The rule is a guideline, not a grade. If needs are 60%, reduce savings to 15% temporarily and cut wants to 25% — or work on reducing housing or transportation costs over time. The goal is progress, not perfection.",
  },
  {
    question: 'Does the 50/30/20 rule include taxes?',
    answer:
      'No. The percentages apply to your take-home pay — after taxes. Start with your actual net pay, not your gross salary.',
  },
  {
    question: "Should I count my 401(k) contribution as savings in the 20%?",
    answer:
      'Yes, if you make contributions beyond the employer-matched amount. The employer match is essentially additional compensation and many planners treat it separately. Either way, capture the full match before thinking about the 20% allocation.',
  },
  {
    question: 'Is 50/30/20 good for paying off debt?',
    answer:
      "It's a starting point. Minimum debt payments go in the needs category. Extra debt payments come from the savings 20%. If you're aggressively paying off high-interest debt, you might temporarily run a 50/10/40 or 50/5/45 split — essentially borrowing from wants and savings to accelerate payoff. Once the debt is gone, rebalance.",
  },
]

export default function FiftyThirtyTwentyBudgetRulePost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">
        What Is the 50/30/20 Budget Rule?
      </h1>
      <p className="mt-2 text-sm text-muted">Published September 14, 2026</p>

      <p className="mt-6 text-lg leading-relaxed text-muted">
        The 50/30/20 rule is a simple budgeting framework that divides your
        monthly take-home pay into three categories:
      </p>
      <ul className={ul}>
        <li>50% for needs — essential expenses you can&apos;t avoid</li>
        <li>30% for wants — discretionary spending on things you enjoy</li>
        <li>
          20% for savings and debt payoff — building your financial future
        </li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        That&apos;s the whole framework. No spreadsheet required, no
        tracking every coffee purchase. It&apos;s designed to be simple
        enough that you&apos;ll actually use it.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Where Did 50/30/20 Come From?
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        The rule was popularized by Senator Elizabeth Warren and her
        daughter Amelia Warren Tyagi in their 2005 book &ldquo;All Your
        Worth.&rdquo; The idea was to give people a simple, memorable
        framework for balancing present spending and future financial
        security without the complexity of a detailed budget.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Breaking Down Each Category
      </h2>
      <h3 className="mt-6 text-lg font-semibold text-navy">
        50% — Needs
      </h3>
      <p className="mt-3 leading-relaxed text-muted">
        Needs are expenses you must pay to maintain a basic standard of
        living. If you stopped paying them, serious consequences would
        follow — eviction, no transportation to work, no health coverage.
      </p>
      <p className="mt-4 font-semibold text-navy">Common needs:</p>
      <ul className={ul}>
        <li>Rent or mortgage payment</li>
        <li>Utilities (electricity, water, heat)</li>
        <li>Groceries (not restaurants — that&apos;s a want)</li>
        <li>
          Transportation to work (car payment, insurance, gas, or transit
          pass)
        </li>
        <li>Health insurance premiums</li>
        <li>Minimum debt payments</li>
        <li>Childcare if required for work</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        The 50% target is genuinely difficult in high-cost cities. In San
        Francisco, New York, or Los Angeles, rent alone can consume
        40–50% of take-home pay for many people. If your needs legitimately
        exceed 50%, the framework still works — you adjust the other
        categories proportionally and focus on increasing income or
        reducing housing costs over time.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-navy">
        30% — Wants
      </h3>
      <p className="mt-3 leading-relaxed text-muted">
        Wants are everything that improves your quality of life but
        isn&apos;t strictly necessary. If you stopped paying them, life
        would continue — just with fewer enjoyable things.
      </p>
      <p className="mt-4 font-semibold text-navy">Common wants:</p>
      <ul className={ul}>
        <li>Dining out and takeout</li>
        <li>Streaming services and entertainment subscriptions</li>
        <li>Gym membership</li>
        <li>Travel and vacations</li>
        <li>Hobbies and activities</li>
        <li>Clothing beyond basic necessities</li>
        <li>Upgraded phone or electronics</li>
        <li>The nicer apartment when a cheaper one would do</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        The line between needs and wants is sometimes blurry. Your phone is
        a need. The latest iPhone is a want. Transportation to work is a
        need. A new car when your current one runs fine is a want. Use
        honest judgment.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-navy">
        20% — Savings and Debt Payoff
      </h3>
      <p className="mt-3 leading-relaxed text-muted">
        This category covers your financial future — both building assets
        and eliminating debt.
      </p>
      <p className="mt-4 font-semibold text-navy">What goes in the 20%:</p>
      <ul className={ul}>
        <li>Emergency fund contributions</li>
        <li>401(k) contributions beyond the employer match</li>
        <li>Roth IRA contributions</li>
        <li>Brokerage account investments</li>
        <li>Extra debt payments above the minimum</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        The employer-matched portion of your 401(k) is effectively
        additional compensation — some planners count it toward the
        savings 20%, others treat it separately. Either way, capture the
        full match before anything else.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Is 50/30/20 Realistic?
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        For some people in some situations, yes. For others, it requires
        adjustment.
      </p>
      <p className="mt-4 font-semibold text-navy">Who it works well for:</p>
      <ul className={ul}>
        <li>Middle-income earners in moderate cost-of-living areas</li>
        <li>People without significant high-interest debt</li>
        <li>
          Those who want a simple framework without detailed tracking
        </li>
      </ul>
      <p className="mt-4 font-semibold text-navy">Where it breaks down:</p>
      <ul className={ul}>
        <li>
          High cost-of-living cities where housing alone exceeds 30–40% of
          take-home pay
        </li>
        <li>People with significant student loan or credit card debt</li>
        <li>
          Lower income earners where needs exceed 50% of take-home
          regardless of choices
        </li>
        <li>High earners where 20% savings is more than enough</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        The framework is a starting point, not a rigid rule. Use it to
        assess your current spending and identify imbalances, then adjust
        based on your actual situation.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        How to Apply 50/30/20 to Your Budget
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Step 1: Calculate your monthly take-home pay</strong>{' '}
        Use your actual net pay — after taxes, Social Security, Medicare,
        and any pre-tax deductions like 401(k) or health insurance. Use our{' '}
        <Link href="/paycheck-calculator" className="text-accent underline">
          Paycheck Calculator
        </Link>{' '}
        if you&apos;re not sure of your exact take-home.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Step 2: Calculate your targets</strong>{' '}
        Multiply your take-home pay by 0.50, 0.30, and 0.20.
      </p>
      <p className="mt-4 font-semibold text-navy">
        Example on $5,500/month take-home:
      </p>
      <ul className={ul}>
        <li>Needs: $2,750</li>
        <li>Wants: $1,650</li>
        <li>Savings: $1,100</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        <strong className="text-navy">Step 3: Add up your actual spending in each category</strong>{' '}
        List your monthly expenses and sort them into needs and wants.
        Total each.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Step 4: Compare actual to target</strong>{' '}
        Where are you over? Where are you under? The gaps tell you where
        to focus.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Step 5: Adjust</strong> If needs
        exceed 50%, look for ways to reduce the largest fixed costs over
        time (housing, car). If you&apos;re saving less than 20%, find
        wants you&apos;re willing to cut or income you can grow.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        50/30/20 vs Other Budgeting Methods
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Zero-based budgeting</strong> — every
        dollar gets assigned a job, income minus expenses equals zero. More
        detailed than 50/30/20, better for people who want precise control
        or are in debt payoff mode.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Pay yourself first</strong> —
        automate savings on payday, spend what&apos;s left however you
        want. Less structured, works well for people who trust themselves
        not to overspend.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Envelope method</strong> — physical
        cash divided into envelopes by category. Extreme spending control,
        good for people who struggle with overspending.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        50/30/20 sits between detailed budgeting and no budgeting at all.
        It&apos;s the right level of structure for most people who want to
        be intentional with money without making it their hobby.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Use the Budget Calculator
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Our{' '}
        <Link href="/budget-calculator" className="text-accent underline">
          Budget Calculator
        </Link>{' '}
        applies the 50/30/20 framework to your actual take-home pay and
        shows you exactly what each category should be in dollar terms.
        Enter your monthly income and see your personalized targets
        instantly.
      </p>

      <FAQAccordion items={faqs} />
    </div>
  )
}
