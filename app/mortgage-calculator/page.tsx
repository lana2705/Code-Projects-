import type { Metadata } from 'next'
import MortgageCalculator from '@/components/calculators/MortgageCalculator'
import EtsyCTA from '@/components/shared/EtsyCTA'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const TITLE = 'Mortgage Calculator — Estimate Your Monthly Payment'
const OG_TITLE = `${TITLE} | ${SITE_NAME}`
const DESCRIPTION =
  'Free conventional mortgage calculator. Estimate your monthly payment, total interest paid, and full amortization schedule based on home price, down payment, and interest rate.'
const PATH = '/mortgage-calculator'
// JSON-LD requires an absolute URL — the metadata block below uses relative
// paths and resolves them via the root layout's metadataBase instead.
const ABSOLUTE_URL = `${SITE_URL}${PATH}`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: OG_TITLE,
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

const mortgageFAQs: FAQItem[] = [
  {
    question: 'How is a monthly mortgage payment calculated?',
    answer:
      'Your base mortgage payment covers principal and interest, calculated using the loan amount, interest rate, and loan term. The formula produces a fixed monthly payment that gradually shifts from mostly interest at the start to mostly principal at the end — this is called amortization. Property taxes, home insurance, HOA fees, and estimated PMI are added on top to get your total monthly housing cost. This calculator covers conventional fixed-rate mortgages.',
  },
  {
    question: 'What does PITI stand for?',
    answer:
      "PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a full monthly mortgage payment. Principal pays down your loan balance. Interest is the lender's fee for the loan. Property taxes are often collected monthly through an escrow account and paid to the local taxing authority by your mortgage servicer — not all loans require escrow, but most conventional loans do. Insurance is homeowner's insurance, also commonly escrowed. If your down payment is under 20% on a conventional loan, estimated PMI is also added.",
  },
  {
    question: 'What is PMI and when can I remove it?',
    answer:
      "PMI (Private Mortgage Insurance) protects the lender if you default on a conventional loan. It typically applies when your down payment is below 20% of the purchase price, though lender-paid PMI and other arrangements exist. Actual PMI rates vary based on credit score, down payment, loan amount, and insurer — 0.5% is a common starting estimate. Under the Homeowners Protection Act: you may request cancellation when your scheduled balance reaches 80% of the original home value (subject to lender requirements and payment history); lenders must automatically cancel at 78% of the original value based on the amortization schedule, assuming you're current; and PMI must terminate at the loan midpoint. Making extra principal payments can help you reach 80% LTV sooner and request removal earlier. These rules generally apply to conventional mortgages — FHA and VA loans have different mortgage insurance rules.",
  },
  {
    question: 'How does loan term affect my payment?',
    answer:
      'A shorter term means a higher monthly payment but far less total interest. On a $500,000 loan at 6.5%: a 30-year term costs about $3,160/month with roughly $638,000 in total interest. A 15-year term costs about $4,355/month — $1,195 more per month — but only $284,000 in total interest, saving about $354,000 over the life of the loan. The right choice depends on your cash flow and how long you plan to stay in the home.',
  },
  {
    question: 'How much do I need for a down payment on a conventional loan?',
    answer:
      "Conventional loans can require as little as 3% down through certain programs (such as Fannie Mae's HomeReady or Freddie Mac's Home Possible). However, any down payment below 20% typically requires PMI on a conventional loan. A 20% down payment generally avoids borrower-paid PMI on a conventional mortgage — on a $700,000 home, the difference between 5% and 20% down can save $300–$400/month in PMI alone. The right down payment depends on your savings, cash flow, and how quickly you want to build equity.",
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Calculator',
  url: ABSOLUTE_URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function MortgageCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <h1 className="text-4xl font-bold text-navy">Mortgage Calculator</h1>
      <p className="mt-4 text-lg text-muted">
        This calculator estimates your monthly payment for a conventional
        fixed-rate mortgage. Enter your home price, down payment, loan term,
        and interest rate to see a full breakdown of principal, interest,
        taxes, and insurance — and explore how extra payments can reduce
        your total interest and pay off your loan faster.
      </p>
      <p className="mt-4 text-sm text-muted">
        Results are estimates for conventional fixed-rate mortgages only.
        FHA, VA, USDA, and adjustable-rate mortgages have different rules
        and costs. Actual payments depend on your lender&apos;s terms,
        credit score, local property taxes, and insurance.
      </p>

      <div className="mt-8">
        <MortgageCalculator />
      </div>

      <EtsyCTA page="mortgage" />
      <FAQAccordion items={mortgageFAQs} />

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-navy">
          How does a mortgage calculator work?
        </h2>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          Enter your home price, down payment, loan term, and interest rate
          to see your estimated monthly mortgage payment for a conventional
          fixed-rate mortgage. The calculator uses the standard amortization
          formula to determine the fixed monthly payment that pays off the
          loan over your chosen term.
        </p>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          Add optional inputs — property taxes, homeowner&apos;s insurance,
          HOA fees, and estimated PMI — to see your full monthly housing
          cost. These costs can vary significantly by location, property
          value, insurance coverage, and HOA, and often add substantially to
          the base P&amp;I payment.
        </p>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          The amortization schedule shows how each payment splits between
          principal and interest month by month. In the early years, the
          majority goes to interest. By the final years, the majority goes
          to principal. This is the normal structure of a fixed-rate
          mortgage.
        </p>
        <h2 className="mb-3 text-xl font-semibold text-navy">
          How much house can I afford?
        </h2>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          A commonly cited guideline is to keep your principal, interest,
          property taxes, and homeowners insurance around or below 28% of
          your gross monthly income. This is sometimes called the front-end
          debt-to-income ratio.
        </p>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          Lenders also evaluate your total monthly debt payments (housing
          plus car loans, student loans, credit cards, etc.) as a percentage
          of gross income. Requirements vary by loan type, lender, and
          borrower profile — some conventional loan programs allow higher
          ratios depending on compensating factors like credit score and
          reserves.
        </p>
        <p className="text-sm leading-[1.7] text-muted">
          These are guidelines, not approval guarantees. Your actual
          eligibility depends on your credit score, debt profile, savings,
          the specific loan program, and the lender&apos;s underwriting
          criteria. A mortgage affordability calculator (coming soon) will
          give you a more complete picture.
        </p>
      </section>
    </div>
  )
}
