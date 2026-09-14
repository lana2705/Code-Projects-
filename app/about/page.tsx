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
          {SITE_NAME} is a free personal finance website built around one
          idea: financial math shouldn&apos;t require a finance degree to
          understand.
        </p>
        <p>
          Every calculator on {SITE_NAME} runs directly in your browser. The
          numbers you enter never leave your device — no account required,
          no data stored, no financial products to buy.
        </p>
        <p>
          We cover the calculations that come up in real life: understanding
          your paycheck, planning your debt payoff, building a budget,
          projecting your savings, and more. Each tool is designed to give
          you a clear, honest answer — with plain-English explanations of
          how the result was calculated and what it means.
        </p>
        <p>
          {SITE_NAME} was built in San Francisco by a product manager who
          got tired of financial tools that bury the answer in clutter,
          upsells, and unnecessary complexity. These calculators exist
          because everyone deserves clarity about their own money.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-btn bg-navy px-5 py-2.5 text-center font-semibold text-white transition-colors hover:bg-[#16264d]"
        >
          Explore our calculators →
        </Link>
      </div>
    </div>
  )
}
