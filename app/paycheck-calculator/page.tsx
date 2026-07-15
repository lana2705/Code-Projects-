import type { Metadata } from 'next'
import PaycheckCalculator from '@/components/calculators/PaycheckCalculator'
import EtsyCTA from '@/components/shared/EtsyCTA'
import AdSenseSlot from '@/components/shared/AdSenseSlot'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const TITLE =
  'Paycheck Calculator — Calculate Your Take-Home Pay | TheFinanceBeacon'
const DESCRIPTION =
  'Free paycheck calculator. Enter your salary, state, and deductions to see exactly what hits your bank account after federal tax, state tax, and FICA.'
const URL = `${SITE_URL}/paycheck-calculator`

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Calculate Your Take-Home Pay',
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

const paycheckFAQs: FAQItem[] = [
  {
    question: 'How much tax comes out of my paycheck?',
    answer:
      'It depends on your income, filing status, and state. Most people pay 10–22% in federal income tax, 7.65% in FICA (Social Security + Medicare), and 0–9% in state income tax. Use this calculator to get a personalized estimate.',
  },
  {
    question: 'What is FICA tax?',
    answer:
      'FICA stands for Federal Insurance Contributions Act. Social Security is taxed at 6.2% on wages up to $184,500 in 2026, and Medicare is taxed at 1.45% on all wages. Your employer matches these amounts, so you only see your half on your pay stub.',
  },
  {
    question: 'How do I increase my take-home pay?',
    answer:
      'The most effective ways are increasing your 401(k) contribution (reduces taxable income), adjusting your W-4 withholding if you consistently get large refunds, and checking if you qualify for pre-tax benefits like an HSA or FSA.',
  },
  {
    question: 'Why is my take-home pay different from this estimate?',
    answer:
      'Several factors can cause differences: your W-4 elections, employer-specific benefits, local taxes (city or county), union dues, or garnishments. This calculator uses standard assumptions — your HR department or pay stub will have the exact figures. Additionally, this calculator uses flat state income tax estimates — actual state tax calculations use progressive brackets in most states, so your real state tax may differ somewhat from what\'s shown here.',
  },
  {
    question: "What's the difference between gross and net pay?",
    answer:
      'Gross pay is your salary or hourly wages before any deductions. Net pay — your take-home pay — is what\'s left after federal taxes, state taxes, FICA, and any pre-tax deductions like 401(k) or health insurance premiums are subtracted.',
  },
  {
    question: 'How is take-home pay calculated?',
    answer:
      'Your take-home pay starts with your gross salary and works through several layers of deductions. First come pre-tax deductions like 401(k) contributions and health insurance premiums, which reduce your taxable income. Then federal income tax is applied using progressive brackets — you only pay each rate on the income within that bracket, not on your total income. Next come FICA taxes: 6.2% for Social Security and 1.45% for Medicare. State income tax varies widely — from 0% in Texas and Florida to over 9% in California. The result is your net pay — the amount that actually hits your bank account.',
  },
  {
    question: 'Why does my paycheck feel smaller than my salary?',
    answer:
      'A $70,000 salary sounds like $5,833 per month. But after federal tax, FICA, state tax, and a modest 401(k) contribution, you might take home closer to $4,200–$4,500 per month. That gap is real, and understanding it helps you budget realistically rather than planning around your gross salary. The paycheck calculator above shows you exactly where each dollar goes before it reaches you.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Paycheck Calculator',
  url: URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function PaycheckPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <h1 className="text-4xl font-bold text-navy">Paycheck Calculator</h1>
      <p className="mt-4 text-lg text-muted">
        Enter your gross salary, state, and deductions to see an estimated
        breakdown of your take-home pay after federal taxes, state taxes, Social
        Security, and Medicare. Results are estimates based on 2026 tax
        brackets — your actual paycheck may vary based on your W-4 elections and
        employer-specific deductions.
      </p>

      <div className="mt-8">
        <PaycheckCalculator />
      </div>

      <EtsyCTA page="paycheck" />
      <AdSenseSlot slot="PAYCHECK_CALC_RESULTS" />
      <FAQAccordion items={paycheckFAQs} />
    </div>
  )
}
