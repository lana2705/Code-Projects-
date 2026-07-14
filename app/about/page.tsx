import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About',
  description:
    'TheFinanceBeacon is a free personal finance tool site built for people who want straight answers about their money. No jargon, no signup, no data stored.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      'TheFinanceBeacon is a free personal finance tool site built for people who want straight answers about their money. No jargon, no signup, no data stored.',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    images: ['/og-image.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">About {SITE_NAME}</h1>
      <div className="mt-6 space-y-5 text-lg text-muted">
        <p>
          {SITE_NAME} is a free personal finance tool site built for people who
          want straight answers about their money. No jargon, no signup, no data
          stored. Every calculator runs entirely in your browser — your numbers
          stay on your device and nowhere else.
        </p>
        <p>
          Right now we offer two calculators: a Paycheck Calculator that shows
          you exactly what lands in your bank account after taxes and
          deductions, and a Debt Payoff Calculator that maps your path to debt
          freedom using the avalanche and snowball methods side by side. More
          tools are on the way.
        </p>
        <p>
          {SITE_NAME} was built in San Francisco by a product manager and
          personal finance enthusiast who got tired of clunky, ad-stuffed tools
          that make simple math harder than it needs to be. These calculators
          exist because everyone deserves clarity about their own money.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/debt-payoff-calculator"
          className="rounded-btn bg-navy px-5 py-2.5 text-center font-semibold text-white transition-colors hover:bg-[#16264d]"
        >
          Debt Payoff Calculator →
        </Link>
        <Link
          href="/paycheck-calculator"
          className="rounded-btn border border-navy px-5 py-2.5 text-center font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          Paycheck Calculator →
        </Link>
      </div>
    </div>
  )
}
