import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms of use for ${SITE_NAME}.`,
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
  openGraph: {
    title: `Terms of Use | ${SITE_NAME}`,
    description: `Terms of use for ${SITE_NAME}.`,
    url: '/terms',
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

const h2 = 'mt-10 text-2xl font-semibold text-navy'
const p = 'mt-3 leading-relaxed text-muted'

interface Section {
  heading: string
  body: React.ReactNode
}

const SECTIONS: Section[] = [
  {
    heading: 'Welcome',
    body: (
      <>
        Welcome to Finance Beacon. These Terms of Use govern your access to
        and use of myfinancebeacon.com and its financial calculators. By
        using this website, you agree to these Terms.
      </>
    ),
  },
  {
    heading: 'Use of the Website',
    body: (
      <>
        Finance Beacon provides free financial calculators and
        informational tools for personal use. You agree to use this website
        only for lawful purposes and in a manner consistent with these Terms.
      </>
    ),
  },
  {
    heading: 'Calculator Results',
    body: (
      <>
        The calculators on Finance Beacon are designed to provide estimates
        based on the information you enter. Although we strive for accuracy,
        results are estimates only and may vary due to changes in tax laws,
        financial regulations, interest rate assumptions, rounding
        differences, or other factors. You are responsible for independently
        verifying any financial information before making decisions based on
        calculator results.
      </>
    ),
  },
  {
    heading: 'Your Data and Calculator Inputs',
    body: (
      <>
        The financial information you enter into our calculators is
        processed entirely within your browser. We do not transmit, store, or
        retain any financial data you input into our tools. Your numbers
        never leave your device.
      </>
    ),
  },
  {
    heading: 'No Professional Advice',
    body: (
      <>
        Finance Beacon does not provide financial, tax, legal, accounting,
        or investment advice. All content on this website is intended for
        informational and educational purposes only. Always consult a
        qualified professional regarding your individual financial situation
        before making financial decisions.
      </>
    ),
  },
  {
    heading: 'No Warranty',
    body: (
      <>
        Finance Beacon is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; without warranties of any kind, express or implied,
        including but not limited to implied warranties of merchantability,
        fitness for a particular purpose, or non-infringement. We do not
        guarantee the accuracy, completeness, reliability, availability, or
        uninterrupted operation of this website or its calculators.
      </>
    ),
  },
  {
    heading: 'Limitation of Liability',
    body: (
      <>
        To the fullest extent permitted by law, Finance Beacon and its
        owner shall not be liable for any direct, indirect, incidental,
        consequential, special, or punitive damages arising from your use of
        — or inability to use — this website or any reliance on calculator
        results.
      </>
    ),
  },
  {
    heading: 'Intellectual Property',
    body: (
      <>
        Unless otherwise noted, all content on Finance Beacon — including
        text, design, graphics, logos, and software — is the property of
        Finance Beacon and may not be copied, reproduced, or distributed
        without written permission.
      </>
    ),
  },
  {
    heading: 'Third-Party Links and Services',
    body: (
      <>
        This website may contain links to third-party websites and services.
        We are not responsible for the content, privacy practices, or
        accuracy of any third-party websites. The inclusion of any link does
        not imply endorsement.
      </>
    ),
  },
  {
    heading: 'Advertising',
    body: (
      <>
        Finance Beacon may display advertisements through Google AdSense or
        other advertising providers. Advertisements are served by third
        parties and do not constitute endorsements or recommendations by
        Finance Beacon.
      </>
    ),
  },
  {
    heading: 'Affiliate Links',
    body: (
      <>
        Some links on this website may be affiliate links, meaning we may
        earn a small commission if you click through and make a purchase or
        sign up for a service — at no additional cost to you. We only link to
        products and services we believe may be genuinely useful. Affiliate
        relationships do not influence our calculator results or editorial
        content.
      </>
    ),
  },
  {
    heading: 'Changes to the Website',
    body: (
      <>
        We reserve the right to modify, suspend, or discontinue any part of
        this website at any time without notice.
      </>
    ),
  },
  {
    heading: 'Changes to These Terms',
    body: (
      <>
        We may update these Terms of Use periodically. The &ldquo;Last
        updated&rdquo; date at the top of this page will reflect the most
        recent revision. Continued use of the website after changes become
        effective constitutes your acceptance of the revised Terms.
      </>
    ),
  },
  {
    heading: 'Governing Law',
    body: (
      <>
        These Terms shall be governed by and interpreted in accordance with
        the laws of the State of California, without regard to its conflict
        of law principles.
      </>
    ),
  },
  {
    heading: 'Contact',
    body: (
      <>
        Questions about these Terms may be directed to us via our contact
        page: myfinancebeacon.com/contact
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted">Last updated July 2026</p>

      {SECTIONS.map((section) => (
        <section key={section.heading}>
          <h2 className={h2}>{section.heading}</h2>
          <p className={p}>{section.body}</p>
        </section>
      ))}
    </div>
  )
}
