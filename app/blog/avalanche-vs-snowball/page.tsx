import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME } from '@/lib/constants'

const TITLE = 'Avalanche vs Snowball: Which Debt Payoff Method Saves More Money?'
const DESCRIPTION =
  'Compare the debt avalanche and debt snowball methods side by side, with a real numbers example, pros and cons, and how to pick the right one for you.'
const PATH = '/blog/avalanche-vs-snowball'

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

const faqs: FAQItem[] = [
  {
    question: 'Which method saves more money, avalanche or snowball?',
    answer:
      'The avalanche method almost always saves more in total interest, because it targets your highest-interest-rate debt first. The snowball method can still save meaningfully more than making only minimum payments — it just usually costs a bit more than avalanche in exchange for faster psychological wins.',
  },
  {
    question: 'Can I switch methods partway through paying off debt?',
    answer:
      "Yes. There's no penalty for changing strategies. Some people start with snowball to build momentum by clearing a small debt quickly, then switch to avalanche once they're motivated and ready to optimize for the lowest total interest.",
  },
  {
    question: 'Does either method hurt my credit score?',
    answer:
      'No — both methods pay down real debt, which generally helps your credit utilization ratio over time regardless of which debt you tackle first. What matters most for your score is making at least the minimum payment on every account, on time, every month.',
  },
  {
    question: 'How much extra should I pay each month to speed up payoff?',
    answer:
      "Any amount helps. Even an extra $50–$100 per month, applied consistently to your priority debt, can shave months or years off your payoff timeline and save hundreds of dollars in interest. Use the Debt Payoff Calculator to see the exact impact of different extra-payment amounts on your own debts.",
  },
]

export default function AvalancheVsSnowballPost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">{TITLE}</h1>
      <p className="mt-2 text-sm text-muted">Published August 28, 2026</p>

      <p className="mt-6 text-lg leading-relaxed text-muted">
        If you have more than one debt, the order you pay them off in changes
        how much you spend in interest — and how fast you feel progress. The
        two most popular strategies, the debt avalanche and the debt
        snowball, take opposite approaches to the same problem. Here&apos;s
        exactly how each one works, what they cost in real numbers, and how
        to decide which one fits you.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        What is the debt avalanche method?
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        The debt avalanche method has you list every debt by interest rate,
        from highest to lowest. You pay the minimum on everything, then put
        every extra dollar you can toward the debt with the highest APR.
        Once that debt is paid off, its minimum payment rolls into the extra
        payment on the next-highest-rate debt, and so on. Because you&apos;re
        always attacking the debt that&apos;s costing you the most per
        dollar borrowed, this method minimizes the total interest you pay
        over the life of your payoff plan.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        What is the debt snowball method?
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        The debt snowball method ignores interest rates entirely and instead
        sorts your debts by balance, from smallest to largest. You pay the
        minimum on everything except the smallest balance, which gets every
        spare dollar until it&apos;s wiped out. Then you move to the
        next-smallest balance, rolling the freed-up payment forward. The
        appeal is momentum: clearing an entire account, even a small one,
        gives you a visible win early on — and that motivation can be the
        difference between sticking with a payoff plan and abandoning it.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        A real example with actual numbers
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Say you have three debts: a $2,000 credit card at 18% APR with a $60
        minimum payment, a $5,000 credit card at 22% APR with a $150 minimum
        payment, and an $8,000 personal loan at 9% APR with a $200 minimum
        payment. That&apos;s $410 in required minimum payments, and you can
        afford to put an extra $100 toward debt each month — $510 total.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        With avalanche, your extra $100 goes to the 22% card first (the
        highest rate), even though it&apos;s not your smallest balance. With
        snowball, your extra $100 goes to the $2,000 card first (the
        smallest balance), even though the 22% card is costing you more per
        month in interest. In a comparison like this, avalanche typically
        finishes a few months sooner and saves somewhere in the range of
        $150–$400 in total interest, while snowball clears its first account
        the fastest — often in three to four months — for an early
        motivational win. The exact numbers depend on your specific
        balances, rates, and payments, which is exactly what our{' '}
        <Link
          href="/debt-payoff-calculator"
          className="text-accent underline"
        >
          Debt Payoff Calculator
        </Link>{' '}
        works out for you automatically, side by side.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Pros and cons of each method
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Avalanche pros:</strong> mathematically
        optimal, minimizes total interest paid, gets you debt-free in the
        least amount of time for a given payment budget.{' '}
        <strong className="text-navy">Avalanche cons:</strong> if your
        highest-rate debt also has a large balance, it can take a while
        before you see any account fully paid off, which some people find
        demotivating.
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        <strong className="text-navy">Snowball pros:</strong> quick early
        wins keep motivation high, simpler to understand and stick with,
        reduces the number of accounts you&apos;re juggling sooner.{' '}
        <strong className="text-navy">Snowball cons:</strong> usually costs
        more in total interest than avalanche, and can take slightly longer
        to become fully debt-free if your smallest balances aren&apos;t your
        highest-rate ones.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Which method should you choose?
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        If you&apos;re disciplined, motivated by numbers, and want to pay the
        least amount of interest possible, choose avalanche. If you&apos;ve
        tried to pay down debt before and lost steam, or you know you need
        visible progress to stay on track, choose snowball — a plan you
        actually finish beats a theoretically optimal plan you abandon.
        There&apos;s also nothing stopping you from starting with snowball
        for the early confidence boost and switching to avalanche once
        you&apos;re in a rhythm. The best method is ultimately the one you
        stick with until the last balance hits zero.
      </p>

      <p className="mt-6 leading-relaxed text-muted">
        Ready to see your own numbers? Plug your debts into the{' '}
        <Link
          href="/debt-payoff-calculator"
          className="text-accent underline"
        >
          Debt Payoff Calculator
        </Link>{' '}
        to compare avalanche and snowball side by side, see your exact
        debt-free date, and find out how much faster an extra monthly
        payment gets you there.
      </p>

      <FAQAccordion items={faqs} />
    </div>
  )
}
