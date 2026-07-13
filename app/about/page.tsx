import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About',
  description:
    'FinCalcHub is a free personal finance tool site. No signup, no data stored — every calculator runs entirely in your browser.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      'FinCalcHub is a free personal finance tool site. No signup, no data stored — every calculator runs entirely in your browser.',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    images: ['/og-image.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">About {SITE_NAME}</h1>
      <p className="mt-6 text-lg text-muted">
        {SITE_NAME} is a free personal finance tool site. No signup required, no
        data stored, no nonsense. Our calculators run entirely in your browser —
        your numbers never leave your device. Built in San Francisco.
      </p>
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
