import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { FORMSPREE_ENDPOINT, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${SITE_NAME} team.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: `Get in touch with the ${SITE_NAME} team.`,
    url: '/contact',
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

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">Contact</h1>
      <p className="mt-4 text-muted">
        Have a question, a suggestion, or a calculator you&apos;d like to see?
        Send us a note.
      </p>
      <ContactForm />
      <p className="mt-6 text-[13px] text-muted">
        {FORMSPREE_ENDPOINT
          ? 'Your message is sent directly to us. No account or signup needed.'
          : 'Note: Submitting the form opens your email client with a prefilled message — no backend or data storage involved.'}
      </p>
    </div>
  )
}
