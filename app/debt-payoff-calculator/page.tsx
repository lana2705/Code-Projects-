import type { Metadata } from 'next'
import DebtPayoffCalculator from '@/components/calculators/DebtPayoffCalculator'
import EtsyCTA from '@/components/shared/EtsyCTA'
import AdSenseSlot from '@/components/shared/AdSenseSlot'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const TITLE =
  'Debt Payoff Calculator — Avalanche vs Snowball | TheFinanceBeacon'
const DESCRIPTION =
  'Free debt payoff calculator. Compare the avalanche and snowball methods side by side. See your debt-free date and total interest paid in seconds.'
const URL = `${SITE_URL}/debt-payoff-calculator`

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator — Avalanche vs Snowball',
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: SITE_NAME,
    images: ['/og-image.png'],
  },
}

const debtFAQs: FAQItem[] = [
  {
    question: 'What is the avalanche method?',
    answer:
      'The avalanche method pays off your highest-interest debt first while making minimum payments on all others. Once the highest-rate debt is paid off, you roll that payment to the next highest. It minimizes total interest paid.',
  },
  {
    question: 'What is the snowball method?',
    answer:
      'The snowball method pays off your smallest balance first regardless of interest rate. The psychological wins of eliminating debts quickly can help keep you motivated. It usually costs more in interest than the avalanche method.',
  },
  {
    question: 'Which method is better — avalanche or snowball?',
    answer:
      "Mathematically, the avalanche method saves more money. But the best method is the one you'll stick to. If you need quick wins to stay motivated, snowball works. If you're disciplined and focused on the lowest cost, choose avalanche.",
  },
  {
    question: 'How does the extra monthly payment work?',
    answer:
      "Any extra payment you add is applied to your priority debt each month, on top of the minimum payments. Even an extra $50/month can dramatically reduce your payoff timeline. Once a debt is fully paid off, that debt's minimum payment automatically rolls into the extra payment pool and gets applied to the next priority debt — this is called the 'debt rollover' effect and is what makes structured payoff so powerful.",
  },
  {
    question: 'Is this calculator accurate?',
    answer:
      'The calculator uses standard amortization math and provides a reliable estimate of your payoff timeline and total interest. Results assume your balances, interest rates, and payment amounts stay constant throughout the payoff period. Real-world results will vary if you miss payments, rates change, or you add new debt. Always verify with your lender for exact payoff figures.',
  },
  {
    question: 'How does the debt payoff calculator work?',
    answer:
      "Enter each of your debts — credit cards, personal loans, student loans, car payments, anything with a balance and an interest rate. Add the minimum payment for each, then optionally add an extra monthly amount you can commit to paying down debt. The calculator runs two simulations simultaneously: the avalanche method (highest APR first) and the snowball method (lowest balance first). You'll see exactly how long each takes, how much interest you'll pay, and which one saves you more money. Most people save hundreds or thousands of dollars by switching from minimum payments to a structured payoff strategy. The sooner you start, the more you save.",
  },
  {
    question: 'Avalanche vs snowball: which saves more?',
    answer:
      'In almost every scenario, the avalanche method saves more money because it targets the most expensive debt first. The difference can be significant — on a $20,000 debt portfolio with mixed interest rates, the avalanche method often saves $1,000–$3,000 in interest compared to the snowball. That said, personal finance is personal. Research shows that people who feel progress are more likely to stay on track. If the snowball method keeps you motivated and you actually stick to it, it beats an avalanche plan you abandon after three months.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Debt Payoff Calculator',
  url: URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function DebtPayoffPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <h1 className="text-4xl font-bold text-navy">Debt Payoff Calculator</h1>
      <p className="mt-4 text-lg text-muted">
        Enter your debts below to see your estimated debt-free date, total
        interest paid, and a side-by-side comparison of the two most effective
        payoff strategies. The avalanche method (highest interest rate first)
        saves the most money. The snowball method (smallest balance first)
        builds momentum with quick wins. See which one works better for your
        situation — and how much faster an extra monthly payment gets you to
        zero.
      </p>

      <div className="mt-8">
        <DebtPayoffCalculator />
      </div>

      <EtsyCTA page="debt" />
      <AdSenseSlot slot="DEBT_CALC_RESULTS" />
      <FAQAccordion items={debtFAQs} />
    </div>
  )
}
