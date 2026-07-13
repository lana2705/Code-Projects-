import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingDown, Wallet } from 'lucide-react'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Free Finance Calculators — Built for Real Life | FinCalcHub',
  description:
    'Free finance calculators for real people. Calculate your take-home pay, plan your debt payoff, and keep more of what you earn.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Free Finance Calculators — Built for Real Life | FinCalcHub',
    description:
      'Free finance calculators for real people. Calculate your take-home pay, plan your debt payoff, and keep more of what you earn.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ['/og-image.png'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Free personal finance calculators — debt payoff and paycheck take-home estimators that run entirely in your browser.',
}

const TOOLS = [
  {
    icon: TrendingDown,
    name: 'Debt Payoff Calculator',
    description: 'See your debt-free date and compare payoff strategies.',
    href: '/debt-payoff-calculator',
  },
  {
    icon: Wallet,
    name: 'Paycheck Calculator',
    description: 'Find out exactly what hits your bank account after taxes.',
    href: '/paycheck-calculator',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-tight text-navy sm:text-[44px]">
          Free Finance Calculators. Built for Real Life.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted">
          Figure out your take-home pay, crush your debt faster, and keep more
          of what you earn.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/debt-payoff-calculator"
            className="w-full rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#16264d] sm:w-auto"
          >
            Debt Payoff Calculator →
          </Link>
          <Link
            href="/paycheck-calculator"
            className="w-full rounded-btn border border-navy px-6 py-3 font-semibold text-navy transition-colors hover:bg-navy hover:text-white sm:w-auto"
          >
            Paycheck Calculator →
          </Link>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium text-muted">
          <span>Free to use</span>
          <span aria-hidden="true">·</span>
          <span>No signup required</span>
          <span aria-hidden="true">·</span>
          <span>No data stored</span>
        </div>
      </section>

      {/* Tool cards */}
      <section className="grid gap-6 py-16 sm:grid-cols-2">
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-card border border-border bg-surface p-7 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-card bg-navy/10 text-navy">
                <Icon size={24} />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-navy">
                {tool.name}
              </h2>
              <p className="mt-2 flex-1 text-muted">{tool.description}</p>
              <span className="mt-4 font-semibold text-accent">
                Try it free →
              </span>
            </Link>
          )
        })}
      </section>

      {/* Footer note */}
      <section className="pb-16 text-center">
        <p className="text-sm text-muted">
          More calculators coming soon. Built by a personal finance nerd in San
          Francisco.
        </p>
      </section>
    </div>
  )
}
