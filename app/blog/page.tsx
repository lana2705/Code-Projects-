import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog'

const TITLE = 'Blog'
const DESCRIPTION =
  'Practical guides on paychecks, taxes, and debt payoff — plain-English explanations to help you make sense of your money.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: '/blog',
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">Blog</h1>
      <p className="mt-4 text-lg text-muted">{DESCRIPTION}</p>

      <div className="mt-10 space-y-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-card border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {formatDate(post.publishedDate)}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-navy">
              {post.title}
            </h2>
            <p className="mt-2 text-muted">{post.description}</p>
            <span className="mt-4 inline-block font-semibold text-accent">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
