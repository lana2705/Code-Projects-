import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME } from '@/lib/constants'

const TITLE = 'How Much Should I Save Each Month?'
const DESCRIPTION =
  "Not sure how much to save each month? Here's how to calculate the right savings amount for your income, goals, and life stage — with real examples."
const PATH = '/blog/how-much-should-i-save-each-month'

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

const SALARY_TABLE = [
  { salary: '$40,000', takeHome: '~$2,800', target: '~$560/month' },
  { salary: '$60,000', takeHome: '~$4,000', target: '~$800/month' },
  { salary: '$80,000', takeHome: '~$5,300', target: '~$1,060/month' },
  { salary: '$100,000', takeHome: '~$6,400', target: '~$1,280/month' },
  { salary: '$150,000', takeHome: '~$9,000', target: '~$1,800/month' },
]

const faqs: FAQItem[] = [
  {
    question: 'How much should I save from each paycheck?',
    answer:
      'Take your monthly savings target and divide by the number of paychecks per month. If you want to save $800/month and get paid biweekly (26 times per year), set aside approximately $369 per paycheck ($800 × 12 ÷ 26).',
  },
  {
    question: 'Is saving $500 a month good?',
    answer:
      'It depends on your income. On a $3,500 monthly take-home, $500 is about 14% — close to the 20% target and a solid savings rate. On a $8,000 monthly take-home, $500 is only 6% — a good start but room to increase. The percentage matters more than the dollar amount.',
  },
  {
    question: 'Should I save or pay off debt first?',
    answer:
      "Both, in the right order. Always capture your employer's 401(k) match first. Then build a small emergency fund ($1,000). Then aggressively pay off high-interest debt. Then build your full emergency fund. Then focus on long-term savings and investing.",
  },
  {
    question: 'How much should a 25-year-old have in savings?',
    answer:
      "A common benchmark is 0.25x–0.5x your annual salary by 25. On a $55,000 salary that's roughly $14,000–$27,000 across all savings and retirement accounts. If you're not there, focus on the habits: automate savings, capture the employer match, build the emergency fund. The compounding catches up.",
  },
]

export default function HowMuchShouldISaveEachMonthPost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">
        How Much Should I Save Each Month?
      </h1>
      <p className="mt-2 text-sm text-muted">Published August 28, 2026</p>

      <p className="mt-6 text-lg leading-relaxed text-muted">
        The honest answer: as much as you sustainably can. The practical
        answer depends on your income, expenses, goals, and where you are
        financially right now. This guide gives you a framework for
        calculating your personal savings target — not a one-size-fits-all
        number.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        The 20% Starting Point
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        The most widely cited savings guideline is 20% of your take-home
        pay, from the 50/30/20 budgeting framework. Take-home pay — not
        gross salary — because that&apos;s the money you actually have
        available.
      </p>
      <p className="mt-4 font-semibold text-navy">Example:</p>
      <ul className={ul}>
        <li>Monthly take-home pay: $5,500</li>
        <li>20% savings target: $1,100 per month</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        That $1,100 covers everything in the savings bucket: emergency fund
        contributions, retirement savings beyond your employer plan, down
        payment savings, and any other financial goals.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        If 20% feels out of reach right now, that&apos;s okay — most people
        don&apos;t start there. The percentage matters less than the habit.
        Starting at 5% and increasing by 1–2% per year gets you to 20%
        within a decade without feeling the pinch.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        A Better Way to Think About It: Save for Specific Goals
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Saving &ldquo;20%&rdquo; without a goal attached is harder to sustain
        than saving toward something specific. Instead of thinking about a
        percentage, work backward from your goals.
      </p>
      <p className="mt-4 font-semibold text-navy">
        Step 1: List your savings goals
      </p>
      <p className="mt-2 leading-relaxed text-muted">For example:</p>
      <ul className={ul}>
        <li>
          Emergency fund: $15,000 (currently have $3,000, need $12,000 more)
        </li>
        <li>Vacation: $4,000 by next June (10 months away)</li>
        <li>Down payment: $60,000 in 4 years</li>
      </ul>
      <p className="mt-4 font-semibold text-navy">
        Step 2: Calculate the monthly amount for each
      </p>
      <ul className={ul}>
        <li>Emergency fund: $12,000 ÷ 24 months = $500/month</li>
        <li>Vacation: $4,000 ÷ 10 months = $400/month</li>
        <li>Down payment: $60,000 ÷ 48 months = $1,250/month (or less with interest)</li>
      </ul>
      <p className="mt-4 font-semibold text-navy">
        Step 3: Add them up and compare to your income
      </p>
      <p className="mt-2 leading-relaxed text-muted">
        In this example: $500 + $400 + $1,250 = $2,150/month. If that
        exceeds what&apos;s available after essential expenses, prioritize.
        Emergency fund first, then the others.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        This approach makes saving concrete instead of abstract.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Savings by Income Level
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Here&apos;s a rough guide to what 20% of take-home pay looks like
        across different income levels, assuming standard deductions and a
        moderate tax rate:
      </p>
      <div className="mt-4 overflow-hidden rounded-card border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-4 py-2 text-left font-medium">
                Gross Annual Salary
              </th>
              <th className="px-4 py-2 text-right font-medium">
                Est. Monthly Take-Home
              </th>
              <th className="px-4 py-2 text-right font-medium">
                20% Savings Target
              </th>
            </tr>
          </thead>
          <tbody>
            {SALARY_TABLE.map((row) => (
              <tr key={row.salary} className="border-t border-border">
                <td className="px-4 py-2 text-navy">{row.salary}</td>
                <td className="px-4 py-2 text-right">{row.takeHome}</td>
                <td className="px-4 py-2 text-right">{row.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 leading-relaxed text-muted">
        These are estimates — use our{' '}
        <Link href="/paycheck-calculator" className="text-accent underline">
          Paycheck Calculator
        </Link>{' '}
        to get your actual take-home pay based on your state and
        deductions.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        What to Prioritize First
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        If you&apos;re figuring out how to allocate limited savings dollars,
        here&apos;s a priority order that most financial planners agree on:
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        <strong className="text-navy">1. Employer 401(k) match (if available)</strong>
        <br />
        This is a guaranteed 50–100% return on your money. If your employer
        matches 4% of your salary, contribute at least 4% before doing
        anything else. Never leave the match on the table.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        <strong className="text-navy">2. Starter emergency fund ($1,000)</strong>
        <br />
        Enough to handle most common emergencies without going into credit
        card debt. Build this before accelerating debt payoff or investing.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        <strong className="text-navy">3. High-interest debt payoff</strong>
        <br />
        Credit card debt at 20%+ APR costs more than almost any investment
        can earn. Pay it off before investing beyond the employer match.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        <strong className="text-navy">4. Full emergency fund (3–6 months of expenses)</strong>
        <br />
        Once high-interest debt is gone, build the full emergency fund.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        <strong className="text-navy">5. Retirement and other long-term goals</strong>
        <br />
        Max your Roth IRA ($7,000/year in 2026 if under 50), then increase
        401(k) contributions, then invest in a brokerage account.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        The Latte Factor — and Why It&apos;s Overstated
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        You&apos;ve probably heard that cutting daily coffee would make you
        rich. The math works out to about $1,800 a year — real money, but
        not life-changing on its own.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        The bigger wins come from:
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        <strong className="text-navy">Housing</strong> — keeping rent or
        mortgage under 30% of take-home pay frees up hundreds of dollars
        per month compared to the average American&apos;s housing cost.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Transportation</strong> — driving a
        used car instead of financing a new one can save $300–$500/month.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Subscriptions</strong> — the average
        American pays for 4–5 streaming services simultaneously. Rotating
        through one at a time saves $50–$100/month.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Dining out</strong> — the average
        American household spends $3,000+ per year at restaurants. Cooking
        at home more frequently has a bigger impact than skipping coffee.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        Small habits matter, but structural expenses — housing,
        transportation, food — are where meaningful savings live.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Pay Yourself First
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        The most reliable way to actually save the amount you intend to
        save:
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Set up an automatic transfer from your checking account to your
        savings account on payday — before you pay any other bill, before
        you see the money, before you&apos;re tempted to spend it.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Automate the exact dollar amount. Not &ldquo;whatever is left
        over.&rdquo; Whatever is left over is almost always zero.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        If your savings target is $800/month and you get paid twice a
        month, set up a $400 automatic transfer on each payday. You&apos;ll
        adjust your spending to whatever remains, rather than trying to
        save whatever you didn&apos;t spend.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        When You Can&apos;t Save 20%
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        If 20% isn&apos;t realistic right now — high cost of living, student
        loans, family obligations — don&apos;t let perfect be the enemy of
        good.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Start with 1%</strong> if that&apos;s
        all you can manage. One percent of a $4,000 monthly take-home is
        $40. Not life-changing, but it builds the habit and keeps the
        account growing.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Increase by 1% every six months</strong>{' '}
        or every time your income increases. After five years of 1%
        increases, you&apos;re at 10%. Add income growth and you may be at
        or near 20% without ever feeling a dramatic cut in lifestyle.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Save windfalls</strong> — tax
        refunds, bonuses, gifts, side income. If you&apos;re not saving
        much from regular income, commit to saving 50–100% of any
        unexpected money.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Use the Savings Calculator
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Enter your starting balance, monthly contribution, interest rate,
        and savings goal into our{' '}
        <Link href="/savings-calculator" className="text-accent underline">
          Savings Calculator
        </Link>
        . It will show you exactly when you&apos;ll hit your goal — and
        what happens if you increase your monthly contribution by $50,
        $100, or $200.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Seeing the specific month you&apos;ll reach your goal is far more
        motivating than a percentage target in the abstract.
      </p>

      <FAQAccordion items={faqs} />
    </div>
  )
}
