import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME } from '@/lib/constants'

const TITLE = 'How Much Should I Have in Savings? A Guide for Every Age'
const DESCRIPTION =
  "Wondering how much you should have saved? Here's a practical guide to savings benchmarks by age, income, and life stage — plus how to calculate your personal target."
const PATH = '/blog/how-much-should-i-have-in-savings'

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
    question: 'How much savings should I have at 30?',
    answer:
      'A common benchmark is 1x your annual salary saved by 30, including retirement accounts. If you earn $70,000, the target is roughly $70,000 in total savings and retirement by age 30. If you\'re not there yet, focus on building your emergency fund first and increasing your savings rate.',
  },
  {
    question: 'Is $10,000 in savings good?',
    answer:
      'It depends on your income and expenses. For someone with $3,000 in monthly expenses, $10,000 covers about 3 months — which is a solid emergency fund. For someone with $6,000 in monthly expenses, $10,000 is a good start but not yet a complete emergency fund. Context matters more than the raw number.',
  },
  {
    question: 'How much should I have in savings before investing?',
    answer:
      'Most financial planners recommend having a fully funded emergency fund (3–6 months of expenses) before investing money beyond an employer-matched 401(k). The employer match is essentially a 50–100% instant return — always capture that first.',
  },
  {
    question: 'What counts as savings?',
    answer:
      "For emergency fund purposes: cash in a savings or money market account. Not stocks, not your 401(k), not home equity. For long-term savings: retirement accounts, brokerage accounts, and any other invested assets count. Keep the two buckets separate mentally and physically.",
  },
]

export default function HowMuchShouldIHaveInSavingsPost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">
        How Much Should I Have in Savings?
      </h1>
      <p className="mt-2 text-sm text-muted">Published September 14, 2026</p>

      <p className="mt-6 text-lg leading-relaxed text-muted">
        There&apos;s no single answer that works for everyone — but there
        are clear benchmarks that can tell you whether you&apos;re on
        track, behind, or ahead. This guide breaks it down by life stage,
        income, and savings goal so you can figure out what &ldquo;enough&rdquo;
        actually means for you.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        The Two Types of Savings You Need
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Before talking numbers, it helps to separate savings into two
        distinct buckets:
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Emergency savings</strong> — money
        you can access immediately if something goes wrong. Job loss,
        medical bill, car repair, broken appliance. This money sits in a
        high-yield savings account and never gets invested. It&apos;s boring
        on purpose.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Long-term savings</strong> — money
        working toward a specific goal. Retirement, down payment, college
        fund, financial independence. This money gets invested and grows
        over time.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Most people focus on one and neglect the other. You need both.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        How Much Emergency Savings Do You Need?
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        The standard guidance is 3–6 months of essential expenses.
        Essential expenses means the bare minimum to keep your life running
        — rent or mortgage, utilities, groceries, transportation, insurance,
        minimum debt payments. Not your full lifestyle budget.
      </p>
      <p className="mt-4 font-semibold text-navy">Example:</p>
      <ul className={ul}>
        <li>Monthly essential expenses: $3,500</li>
        <li>Recommended emergency fund: $10,500 (3 months) to $21,000 (6 months)</li>
      </ul>
      <p className="mt-4 font-semibold text-navy">Who should target 3 months:</p>
      <ul className={ul}>
        <li>Two-income household</li>
        <li>Stable job in a large industry</li>
        <li>No dependents</li>
      </ul>
      <p className="mt-4 font-semibold text-navy">
        Who should target 6 months or more:
      </p>
      <ul className={ul}>
        <li>Single income household</li>
        <li>Self-employed or freelance</li>
        <li>Health issues or irregular income</li>
        <li>Dependents relying on you</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        If you have none of this saved yet, start with a $1,000 starter
        emergency fund as your first milestone. It won&apos;t cover
        everything but it handles most common emergencies and keeps you
        from going into debt over a car repair.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Savings Benchmarks by Age
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        These are rough guidelines based on common financial planning
        frameworks — not rules. Use them as a reference point, not a grade.
      </p>
      <p className="mt-4 font-semibold text-navy">By your late 20s:</p>
      <ul className={ul}>
        <li>Emergency fund: 3 months of expenses</li>
        <li>Retirement savings: roughly 0.5–1x your annual salary</li>
        <li>
          General: building savings habits matters more than the number at
          this stage
        </li>
      </ul>
      <p className="mt-4 font-semibold text-navy">By your mid-30s:</p>
      <ul className={ul}>
        <li>Emergency fund: 3–6 months of expenses fully funded</li>
        <li>Retirement savings: approximately 1–2x your annual salary</li>
        <li>
          If you&apos;re planning to buy a home: 10–20% of target home
          price saved for down payment
        </li>
      </ul>
      <p className="mt-4 font-semibold text-navy">By your 40s:</p>
      <ul className={ul}>
        <li>Emergency fund: fully funded, rarely touched</li>
        <li>Retirement savings: approximately 3–4x your annual salary</li>
        <li>
          Other goals (college, major purchases) should be actively funded
        </li>
      </ul>
      <p className="mt-4 font-semibold text-navy">By your 50s:</p>
      <ul className={ul}>
        <li>
          Emergency fund: 6 months minimum, given closer proximity to fixed
          income
        </li>
        <li>Retirement savings: approximately 6–7x your annual salary</li>
        <li>
          Focus shifts to maximizing retirement contributions and reducing
          debt
        </li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        These benchmarks assume you want to retire around 65 with a
        lifestyle similar to your working years. If you want to retire
        earlier or live on less, the targets shift accordingly.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        How Much Should I Save Each Month?
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        The most widely cited target is saving 20% of your take-home pay —
        the savings slice of the 50/30/20 framework. That 20% covers both
        emergency savings and long-term goals.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        In practice, what matters more than the percentage is the habit. If
        20% isn&apos;t realistic right now, start with 5% or 10% and
        increase it by 1% every time you get a raise.
      </p>
      <p className="mt-4 font-semibold text-navy">
        A simple formula for setting your savings target:
      </p>
      <ol className={ol}>
        <li>Calculate your monthly take-home pay</li>
        <li>List your essential expenses (needs)</li>
        <li>
          Decide on a savings percentage (start with 10% if 20% isn&apos;t
          feasible)
        </li>
        <li>Whatever is left covers discretionary spending</li>
      </ol>
      <p className="mt-4 leading-relaxed text-muted">
        The order matters: pay yourself first. Transfer savings to a
        separate account on payday before you have a chance to spend it.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Savings Benchmarks by Goal
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Emergency fund:</strong> 3–6 months of
        essential expenses (see above)
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Down payment on a home:</strong>{' '}
        10–20% of target home price plus 2–5% for closing costs. On a
        $600,000 home in a high-cost city, that&apos;s $60,000–$120,000 for
        the down payment plus $12,000–$30,000 for closing costs.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">New car (cash purchase):</strong> Full
        purchase price saved. The average new car costs around $48,000 —
        buying cash eliminates interest charges entirely.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Six-month sabbatical:</strong> 6
        months of your full monthly budget (not just essentials), plus a
        buffer for the unexpected.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Financial independence:</strong>{' '}
        Roughly 25x your annual expenses — the commonly cited figure based
        on the 4% withdrawal rule. On $60,000 of annual expenses, that&apos;s
        $1.5 million.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Are You Behind? Here&apos;s What to Do
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        If you&apos;re reading these benchmarks and feeling behind, a few
        things worth keeping in mind:
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        First, most people are behind on savings. You&apos;re not unusual
        and you&apos;re not too late to make real progress.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Second, the benchmarks assume consistent income and no major
        setbacks — neither of which describes most people&apos;s actual
        lives. Medical emergencies, job losses, recessions, and family
        obligations knock people off track all the time.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        Third, the most important variable is your savings rate going
        forward, not your current balance. Someone who starts saving
        aggressively at 35 will end up in far better shape than someone who
        saved a little in their 20s and stopped.
      </p>
      <p className="mt-4 font-semibold text-navy">
        If you&apos;re starting from zero:
      </p>
      <ul className={ul}>
        <li>Month 1: Open a high-yield savings account</li>
        <li>
          Month 1: Set up an automatic transfer of whatever you can afford
          — even $50
        </li>
        <li>Month 3: Increase the transfer by $25</li>
        <li>Month 6: Revisit and increase again</li>
      </ul>
      <p className="mt-4 leading-relaxed text-muted">
        Small, consistent amounts compound into significant savings over
        time.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        How Finance Beacon Can Help
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Use our{' '}
        <Link href="/savings-calculator" className="text-accent underline">
          Savings Calculator
        </Link>{' '}
        to see exactly how long it will take to reach your savings goal
        based on your current balance, monthly contribution, and interest
        rate. Enter a specific goal amount — like your 3-month emergency
        fund target or a down payment — and see the exact month you&apos;ll
        get there.
      </p>

      <FAQAccordion items={faqs} />
    </div>
  )
}
