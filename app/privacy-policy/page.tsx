import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: false, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">Privacy Policy</h1>
      <p className="mt-6 text-muted">
        [Replace with your privacy policy. Must mention Google AdSense, cookies,
        and analytics before applying for AdSense approval. Use termly.io to
        generate a free policy.]
      </p>
    </div>
  )
}
