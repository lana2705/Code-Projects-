import type { Metadata } from 'next'
import SavingsCalculator from '@/components/calculators/SavingsCalculator'
import EtsyCTA from '@/components/shared/EtsyCTA'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const TITLE = 'Savings Calculator — See How Your Money Grows | Finance Beacon'
const DESCRIPTION =
  'Free compound interest calculator. Enter a starting balance, monthly contribution, and interest rate to see exactly how your savings grow over time.'
const PATH = '/savings-calculator'
// JSON-LD requires an absolute URL — the metadata block below uses relative
// paths and resolves them via the root layout's metadataBase instead.
const ABSOLUTE_URL = `${SITE_URL}${PATH}`

export const metadata: Metadata = {
  title: 'Savings Calculator — See How Your Money Grows',
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

const savingsFAQs: FAQItem[] = [
  {
    question: 'How does compound interest work?',
    answer:
      'Compound interest means you earn interest not just on the money you deposit, but also on the interest that money has already earned. Each month, interest is calculated on your current balance and added to it — so next month, you earn interest on an even larger balance. Over many years, this compounding effect can significantly outpace simple interest.',
  },
  {
    question: "What's a good interest rate for a savings account?",
    answer:
      'High-yield savings accounts and money market accounts often pay meaningfully more than traditional brick-and-mortar bank savings accounts, though rates change with the broader interest rate environment. Shop around and compare current rates before assuming your existing account is competitive.',
  },
  {
    question: 'Should I choose a high-yield savings account or a CD?',
    answer:
      'A high-yield savings account keeps your money liquid — you can withdraw anytime, which is ideal for an emergency fund. A CD (certificate of deposit) typically locks in a fixed rate for a set term in exchange for a penalty if you withdraw early. CDs can make sense for money you know you won\'t need for a while and want a guaranteed rate.',
  },
  {
    question: 'How much should I save each month?',
    answer:
      "There's no single right answer, but a common starting point is to save at least 20% of your take-home pay, split between an emergency fund and longer-term goals. Use this calculator to test different monthly contribution amounts and see how each one changes your balance over time.",
  },
  {
    question: 'Does this calculator account for taxes on interest?',
    answer:
      'No — this calculator shows your gross growth before taxes. Interest earned in a standard savings account is generally taxable as ordinary income in the year it\'s earned, unless it\'s held in a tax-advantaged account. Consult a tax professional for how this applies to your specific situation.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Savings Calculator',
  url: ABSOLUTE_URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function SavingsCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <h1 className="text-4xl font-bold text-navy">Savings Calculator</h1>
      <p className="mt-4 text-lg text-muted">
        Enter a starting balance, a monthly contribution, and an interest
        rate to see exactly how your savings compound over time — including
        a year-by-year breakdown of contributions versus interest earned.
      </p>

      <div className="mt-8">
        <SavingsCalculator />
      </div>

      <EtsyCTA page="savings" />
      <FAQAccordion items={savingsFAQs} />

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-navy">
          How compound interest grows your savings over time
        </h2>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          Compound interest grows slowly at first and then accelerates —
          which is why starting early matters more than almost any other
          factor. In the first few years, most of your balance growth comes
          from your own contributions. But as your balance grows, the
          interest you earn each month grows with it, and eventually the
          interest itself becomes the largest contributor to your total
          growth. A $200 monthly contribution at a modest interest rate can
          grow into tens of thousands of dollars over a couple of decades,
          simply because each year&apos;s interest keeps earning its own
          interest going forward.
        </p>
        <h2 className="mb-3 text-xl font-semibold text-navy">
          Savings account vs. investing: which is right for you?
        </h2>
        <p className="text-sm leading-[1.7] text-muted">
          A savings account is the right tool for money you need to access
          reliably and without risk — an emergency fund, or savings for a
          near-term goal like a down payment. Because your principal is
          protected, you won&apos;t lose money, but returns are typically
          modest compared to long-term investing. Money you won&apos;t need
          for five or more years, like retirement savings, is usually better
          suited to investment accounts that can weather short-term
          volatility in exchange for higher long-term growth potential. Most
          people benefit from using both: a savings account for safety and
          liquidity, and investments for long-term growth.
        </p>
      </section>
    </div>
  )
}
