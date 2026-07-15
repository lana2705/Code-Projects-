import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingDown, Wallet, Check, Rocket } from 'lucide-react'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Your Money, Clearly Calculated | Finance Beacon',
  description:
    'Free tools that show you where your paycheck goes and how fast you can pay off your debt. No signup, no data stored.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Your Money, Clearly Calculated | Finance Beacon',
    description:
      'Free tools that show you where your paycheck goes and how fast you can pay off your debt. No signup, no data stored.',
    url: '/',
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
    icon: Wallet,
    name: 'Paycheck Calculator',
    description: 'Find out exactly what hits your bank account after taxes.',
    href: '/paycheck-calculator',
  },
  {
    icon: TrendingDown,
    name: 'Debt Payoff Calculator',
    description: 'See your debt-free date and compare payoff strategies.',
    href: '/debt-payoff-calculator',
  },
]

const TRUST_ITEMS = ['Free to use', 'No signup required', 'No data stored']

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero */}
      <section className="pt-16 text-center sm:pt-24">
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-tight text-navy sm:text-[44px]">
          Your Money, Clearly Calculated.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted">
          Free tools that show you where your paycheck goes and how fast you
          can pay off your debt.
        </p>
      </section>

      {/* Trust bar */}
      <section className="pb-4 pt-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-navy"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </span>
          ))}
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
                <Icon size={24} aria-hidden="true" />
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
      <section className="pb-16">
        <div className="mx-auto flex max-w-xl items-center justify-center gap-3 text-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
            <Rocket size={16} aria-hidden="true" />
          </span>
          <p className="text-sm text-muted">
            More tools coming soon — built in San Francisco for anyone who wants
            clarity about their money.
          </p>
        </div>
      </section>
    </div>
  )
}
