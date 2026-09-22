import type { Metadata } from 'next'
import RetirementCalculator from '@/components/calculators/RetirementCalculator'
import EtsyCTA from '@/components/shared/EtsyCTA'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const TITLE = 'Retirement Calculator — Are You on Track to Retire?'
const OG_TITLE = `${TITLE} | ${SITE_NAME}`
const DESCRIPTION =
  "Free retirement calculator. See if you're on track, how much you'll need, and what happens if you save more. Includes Social Security estimate and inflation adjustment."
const PATH = '/retirement-calculator'
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

const retirementFAQs: FAQItem[] = [
  {
    question: 'How much do I need to retire?',
    answer:
      'A common guideline is to accumulate 25× your desired annual retirement income — this is the inverse of the 4% rule. If you want $60,000/year in retirement, you need approximately $1.5 million saved. This assumes a 30-year retirement, a balanced portfolio, and no major spending surprises. Your actual number depends on Social Security, pension income, your spending in retirement, and how long you live.',
  },
  {
    question: 'What is the 4% rule?',
    answer:
      "The 4% rule is a widely-used guideline that says you can withdraw 4% of your portfolio in the first year of retirement, then adjust for inflation each year, and your money should last 30 years. It originated from the Trinity Study (1998) based on historical market returns. It's a useful starting point but not a guarantee — sequence of returns risk, very long retirements, and high fees can all change the outcome.",
  },
  {
    question: 'How much should I save for retirement each month?',
    answer:
      "A common target is 15% of gross income (including any employer match). If you're starting later, you may need to save more. If your employer matches 3%, you need to contribute 12% yourself to hit 15% total. The exact amount depends on your retirement age, current savings, expected returns, and desired retirement lifestyle. This calculator shows you the specific number for your situation.",
  },
  {
    question: "What's the difference between a 401(k) and an IRA?",
    answer:
      'A 401(k) is an employer-sponsored retirement plan with higher contribution limits ($24,500 in 2026, plus $8,000 catch-up if 50+). An IRA is an individual account you open yourself, with lower limits ($7,500 in 2026, plus $1,100 catch-up). Both come in traditional (pre-tax) and Roth (after-tax) versions. Many people use both — maxing a 401(k) first (especially to get the employer match), then funding an IRA.',
  },
  {
    question: 'Should I save in a traditional or Roth account?',
    answer:
      "The key question is whether you expect your tax rate to be higher now or in retirement. Roth is generally better when you're in a lower tax bracket now (early career) — you pay taxes now and all growth is tax-free. Traditional is often better when you're in a high bracket now and expect lower income in retirement. Many people benefit from having both, which gives flexibility to manage taxes in retirement.",
  },
  {
    question: 'How does Social Security factor in?',
    answer:
      'Social Security typically replaces 40% of pre-retirement income for average earners — less as a percentage for higher earners. Your benefit depends on your 35 highest-earning years and the age you start claiming (62–70). Claiming at 70 instead of 62 can increase your benefit by up to 77%. Get your personalized estimate at ssa.gov/myaccount.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Retirement Calculator',
  url: ABSOLUTE_URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RetirementCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <h1 className="text-4xl font-bold text-navy">Retirement Calculator</h1>
      <p className="mt-4 text-lg text-muted">
        Find out if you&apos;re on track for retirement. Enter your current
        savings, income, and contribution rate to see your projected balance
        at retirement — and whether it will support the income you need.
      </p>
      <p className="mt-4 text-sm text-muted">
        Results are projections based on the assumptions you enter. Actual
        results depend on investment returns, inflation, taxes, and your
        spending in retirement.
      </p>

      <div className="mt-8">
        <RetirementCalculator />
      </div>

      <EtsyCTA page="retirement" />
      <FAQAccordion items={retirementFAQs} />

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-navy">
          How does the retirement calculator work?
        </h2>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          Enter your age, current savings, income, and how much you&apos;re
          saving each month to see your projected retirement balance. The
          calculator compounds your savings at the expected return rate over
          the years until you retire.
        </p>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          It then estimates whether your balance will generate enough
          monthly income to cover your retirement expenses — factoring in
          Social Security if you include it, and keeping everything in
          today&apos;s dollars so you can think about your retirement in
          familiar terms.
        </p>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          If there&apos;s a gap between what you&apos;re on track for and
          what you need, the calculator shows you the specific adjustments
          that would close it: saving more per month, retiring slightly
          later, or adjusting your return assumptions.
        </p>
        <h2 className="mb-3 text-xl font-semibold text-navy">
          How much should I have saved by age?
        </h2>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          A rough benchmark: your retirement savings should equal
          approximately 1× your annual salary by age 30, 3× by 40, 6× by 50,
          and 8× by 60. These are starting points — your actual target
          depends on your retirement age, spending, Social Security benefit,
          and whether you have a pension.
        </p>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          The most useful question isn&apos;t &quot;how do I compare to
          averages?&quot; but &quot;am I on pace for the retirement I
          want?&quot; Use this calculator to find your personal number and
          the monthly savings rate that gets you there.
        </p>
        <h2 className="mb-3 text-xl font-semibold text-navy">
          What return rate should I assume?
        </h2>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          The S&amp;P 500 has historically returned about 10% per year
          before inflation, or 7% after inflation. A diversified portfolio
          of stocks and bonds typically returns 6–8% nominally. We use 7% as
          the default — reasonable for a long-term investor in their
          accumulation years.
        </p>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          Conservative investors or those within 10 years of retirement
          often use 5–6% to account for a shift toward bonds. Using a lower
          return assumption builds in a margin of safety. If your actual
          returns are higher, you&apos;ll simply retire with more than
          projected.
        </p>
        <p className="text-sm leading-[1.7] text-muted">
          Do not use a return rate higher than 8% unless you have a specific
          reason. Rosy return assumptions are the most common way people
          underestimate their retirement savings needs.
        </p>
      </section>
    </div>
  )
}
