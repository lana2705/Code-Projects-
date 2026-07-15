import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { FORMSPREE_ENDPOINT, SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${SITE_NAME} team.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: `Get in touch with the ${SITE_NAME} team.`,
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
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
          ? 'Your message is sent directly to us — no account or signup needed.'
          : 'Note: Submitting the form opens your email client with a prefilled message — no backend or data storage involved.'}
      </p>
    </div>
  )
}
