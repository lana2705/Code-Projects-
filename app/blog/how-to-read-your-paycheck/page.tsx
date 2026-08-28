import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion, { type FAQItem } from '@/components/shared/FAQAccordion'
import { SITE_NAME } from '@/lib/constants'

const TITLE = 'How to Read Your Paycheck: What Every Deduction Actually Means'
const DESCRIPTION =
  'A plain-English breakdown of every line on your pay stub — gross pay, federal and state tax, Social Security, Medicare, 401(k), and net pay.'
const PATH = '/blog/how-to-read-your-paycheck'

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
    question: 'Why is my paycheck smaller than my salary suggests?',
    answer:
      'A $70,000 salary sounds like $5,833 a month, but that figure is your gross pay before any deductions. After federal tax, FICA, state tax, and any pre-tax deductions like a 401(k) or health insurance premium, your actual take-home pay is typically lower — often by 20–30%, depending on your state and elections.',
  },
  {
    question: "What's the difference between gross pay and net pay?",
    answer:
      'Gross pay is your total earnings before anything is subtracted — your salary or hourly wages times hours worked. Net pay, also called take-home pay, is what actually lands in your bank account after all taxes and deductions are subtracted from your gross pay.',
  },
  {
    question: 'Can I change how much tax is withheld from my paycheck?',
    answer:
      'Yes. Your federal withholding is based on the W-4 form you filed with your employer. You can submit an updated W-4 at any time to adjust your withholding — for example, to reduce a large refund (which means you were overpaying all year) or to avoid owing money at tax time.',
  },
  {
    question: 'Does contributing to a 401(k) lower my taxes?',
    answer:
      'Yes, if it&apos;s a traditional (pre-tax) 401(k). Contributions are deducted from your paycheck before federal and, in most states, state income tax is calculated — which lowers your taxable income now in exchange for paying tax when you withdraw the money in retirement. A Roth 401(k) works the opposite way: no upfront tax break, but tax-free withdrawals later.',
  },
]

export default function HowToReadYourPaycheckPost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">{TITLE}</h1>
      <p className="mt-2 text-sm text-muted">Published August 28, 2026</p>

      <p className="mt-6 text-lg leading-relaxed text-muted">
        Your pay stub is full of abbreviations and line items that rarely get
        explained anywhere — FICA, FIT, SIT, and a handful of deductions
        that quietly shrink your paycheck between your offer letter and your
        bank account. Here&apos;s exactly what each one means, in plain
        English.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">Gross pay</h2>
      <p className="mt-3 leading-relaxed text-muted">
        Gross pay is your total earnings before anything is taken out — your
        annual salary divided across your pay periods, or your hourly rate
        times the hours you worked. It&apos;s the number in your offer
        letter, and it&apos;s always larger than what actually hits your
        bank account, because every deduction below is calculated as a
        percentage of it (or a flat amount subtracted from it).
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Federal income tax
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Federal income tax is withheld based on the information you provided
        on your W-4 form — your filing status, dependents, and any
        additional withholding you requested. It&apos;s calculated using
        progressive tax brackets, meaning you only pay each higher rate on
        the portion of income that falls within that bracket, not on your
        entire salary. This is the single largest deduction for most
        earners.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        State income tax
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Most states also withhold their own income tax, though rates vary
        enormously — from 0% in states like Texas and Florida to over 9% in
        states like California. Some states use flat rates, while others use
        their own progressive brackets. If you live and work in different
        states, you may see withholding for both, or a reciprocity
        arrangement that simplifies it to just one.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Social Security (FICA)
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Social Security is a flat 6.2% of your wages, withheld up to an
        annual wage base ($184,500 in 2026 — earnings above that amount
        aren&apos;t subject to Social Security tax). Your employer matches
        this 6.2% on their end, so the total contribution going toward your
        future Social Security benefit is actually double what you see
        withheld from your own pay.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Medicare (FICA)
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Medicare is a flat 1.45% of all your wages, with no wage cap —
        unlike Social Security, it applies to every dollar you earn. High
        earners pay an additional 0.9% Medicare surtax above certain income
        thresholds. Like Social Security, your employer matches the base
        1.45% on their end.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        401(k) contributions
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        If you contribute to a workplace retirement plan, you&apos;ll see it
        listed as a percentage of your gross pay, not a dollar amount — for
        example, 6% means 6% of each paycheck&apos;s gross pay, not $6. A
        traditional 401(k) contribution is deducted before federal (and
        usually state) tax is calculated, which lowers your taxable income
        today. The trade-off is that you&apos;ll pay income tax on that
        money when you withdraw it in retirement.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Net pay (take-home pay)
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        Net pay is everything that&apos;s left after federal tax, state tax,
        Social Security, Medicare, and any pre-tax deductions like your
        401(k) or health insurance premium. This is the number that actually
        deposits into your bank account, and it&apos;s typically 20–30%
        lower than your gross pay — the exact gap depends on your income
        level, filing status, state, and how much you&apos;re contributing
        to pre-tax benefits.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">
        Tips to increase your take-home pay
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        A few adjustments can meaningfully change what lands in your bank
        account. Review your W-4 if you consistently get a large tax refund
        — that means you&apos;re having more withheld than necessary
        throughout the year, essentially giving the government an
        interest-free loan. Check whether your employer offers pre-tax
        benefits like an HSA or FSA, which reduce your taxable income the
        same way a 401(k) does. And if you&apos;re contributing well above
        any employer match on your 401(k), consider whether that money would
        serve you better in take-home pay right now versus tax-deferred
        growth later — there&apos;s no universally right answer, but
        it&apos;s worth running the numbers.
      </p>

      <p className="mt-6 leading-relaxed text-muted">
        Want to see exactly where your own paycheck goes? Enter your salary,
        state, and deductions into the{' '}
        <Link href="/paycheck-calculator" className="text-accent underline">
          Paycheck Calculator
        </Link>{' '}
        for a full breakdown of your take-home pay, down to the dollar.
      </p>

      <FAQAccordion items={faqs} />
    </div>
  )
}
