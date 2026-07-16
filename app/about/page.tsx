import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Finance Beacon is a free personal finance website that helps you make informed financial decisions with simple, accurate calculators. No account required, and your data is never stored.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      'Finance Beacon is a free personal finance website that helps you make informed financial decisions with simple, accurate calculators. No account required, and your data is never stored.',
    url: '/about',
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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">About {SITE_NAME}</h1>
      <div className="mt-6 space-y-5 text-lg text-muted">
        <p>
          {SITE_NAME} is a free personal finance website that helps you make
          informed financial decisions with simple, accurate calculators. No
          account is required, and your data is never stored. Every calculation
          runs directly in your browser, so the information you enter stays on
          your device.
        </p>
        <p>
          Today, {SITE_NAME} includes a Paycheck Calculator that estimates your
          take-home pay after taxes and deductions, and a Debt Payoff Calculator
          that compares the avalanche and snowball methods to help you find the
          fastest path to becoming debt free. More calculators are being added
          to cover budgeting, taxes, loans, retirement, and other everyday
          financial decisions.
        </p>
        <p>
          {SITE_NAME} was created to make everyday financial calculations
          faster, simpler, and easier to understand. Too many financial tools
          are cluttered with ads, unnecessary features, or confusing
          explanations. Our goal is to build calculators that are genuinely
          useful, fast, accurate, and privacy-first, so you can spend less
          time figuring out the math and more time making confident financial
          decisions.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/paycheck-calculator"
          className="rounded-btn bg-navy px-5 py-2.5 text-center font-semibold text-white transition-colors hover:bg-[#16264d]"
        >
          Paycheck Calculator →
        </Link>
        <Link
          href="/debt-payoff-calculator"
          className="rounded-btn border border-navy px-5 py-2.5 text-center font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          Debt Payoff Calculator →
        </Link>
      </div>
    </div>
  )
}
