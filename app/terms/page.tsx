import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms of use for ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">Terms of Use</h1>
      <p className="mt-6 text-muted">[Replace with your terms of use.]</p>
    </div>
  )
}
