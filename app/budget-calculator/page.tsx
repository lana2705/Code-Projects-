import type { Metadata } from 'next'
import BudgetCalculator from '@/components/calculators/BudgetCalculator'
import EtsyCTA from '@/components/shared/EtsyCTA'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const TITLE = 'Budget Calculator — 50/30/20 Rule | Finance Beacon'
const DESCRIPTION =
  'Free 50/30/20 budget calculator. Enter your monthly take-home pay to see exactly how much to spend on needs, wants, and savings.'
const PATH = '/budget-calculator'
// JSON-LD requires an absolute URL — the metadata block below uses relative
// paths and resolves them via the root layout's metadataBase instead.
const ABSOLUTE_URL = `${SITE_URL}${PATH}`

export const metadata: Metadata = {
  title: 'Budget Calculator — 50/30/20 Rule',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
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

const budgetFAQs: FAQItem[] = [
  {
    question: 'What is the 50/30/20 budgeting rule?',
    answer:
      'The 50/30/20 rule splits your after-tax income into three buckets: 50% for needs (rent, utilities, groceries, minimum debt payments), 30% for wants (dining out, entertainment, subscriptions), and 20% for savings and extra debt payments. It\'s a simple starting framework, not a rigid law.',
  },
  {
    question: "What counts as a 'need' vs a 'want'?",
    answer:
      'Needs are expenses you genuinely can\'t avoid — housing, utilities, groceries, insurance, transportation to work, and minimum payments on existing debt. Wants are anything that improves your quality of life but isn\'t strictly necessary — dining out, streaming subscriptions, hobbies, and vacations. When in doubt, ask whether you could keep your job and stay housed without it.',
  },
  {
    question: 'What if my needs are more than 50% of my income?',
    answer:
      "This is common, especially in high cost-of-living areas. If your needs exceed 50%, you'll have to shrink your wants and savings percentages accordingly, or look for ways to reduce fixed costs like housing. The 50/30/20 split is a target to work toward, not a requirement your current budget has to already meet.",
  },
  {
    question: 'Should I use gross or net income for this calculator?',
    answer:
      "Use your net income — your take-home pay after taxes and deductions. The 50/30/20 rule is meant to be applied to the money that actually lands in your bank account, since that's what you have available to actually spend and save. If you don't know your exact take-home pay, our Paycheck Calculator can help you find it.",
  },
  {
    question: 'Is the 50/30/20 rule right for everyone?',
    answer:
      "It's a helpful starting point, but not a one-size-fits-all formula. If you're aggressively paying off debt or saving for a specific short-term goal, you might intentionally shift more than 20% toward savings. If your income is very high or very low relative to your area's cost of living, the percentages may need significant adjustment. Treat it as a framework to customize, not a strict rule.",
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Budget Calculator',
  url: ABSOLUTE_URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function BudgetCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <h1 className="text-4xl font-bold text-navy">Budget Calculator</h1>
      <p className="mt-4 text-lg text-muted">
        Enter your monthly take-home pay to see exactly how much to spend on
        needs, wants, and savings using the popular 50/30/20 budgeting rule.
      </p>

      <div className="mt-8">
        <BudgetCalculator />
      </div>

      <EtsyCTA page="budget" />
      <FAQAccordion items={budgetFAQs} />

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-navy">
          Why the 50/30/20 rule works
        </h2>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          The 50/30/20 rule is popular because it&apos;s simple enough to
          follow without tracking every category of spending down to the
          dollar. Rather than budgeting dozens of line items, you only need
          to watch three buckets. It also builds savings in by design —
          because 20% is earmarked for savings and extra debt payments
          before you decide how to spend the rest, you&apos;re less likely
          to reach the end of the month with nothing left over. For people
          just starting to budget, that combination of simplicity and
          built-in savings is often more sustainable than a highly detailed
          system that&apos;s easy to abandon.
        </p>
        <h2 className="mb-3 text-xl font-semibold text-navy">
          How to adjust the 50/30/20 rule to fit your life
        </h2>
        <p className="text-sm leading-[1.7] text-muted">
          Treat the 50/30/20 split as a starting point, not a strict
          requirement. If you live in a high-cost area, your needs may
          naturally run closer to 60–65% — in that case, consider trimming
          your wants percentage rather than your savings, since consistent
          saving matters more over time than hitting an exact ratio. If
          you&apos;re working toward a specific goal, like paying off debt
          quickly or saving for a home down payment, you might temporarily
          shift more of your wants budget into the savings category. The
          goal isn&apos;t to match the percentages exactly every month —
          it&apos;s to have a clear, sustainable framework that keeps you
          saving consistently.
        </p>
      </section>
    </div>
  )
}
