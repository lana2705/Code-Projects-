import { ETSY_STORE_URL } from '@/lib/constants'

interface EtsyCTAProps {
  page: 'debt' | 'paycheck' | 'savings' | 'budget'
}

const COPY = {
  debt: {
    headline: 'Want a complete debt tracker?',
    subtext: 'Check out our Excel debt payoff templates on Etsy.',
  },
  paycheck: {
    headline: 'Want a done-for-you budget template?',
    subtext: 'Browse our Excel budget spreadsheets on Etsy.',
  },
  savings: {
    headline: 'Want a savings tracker?',
    subtext: 'Browse our Excel savings goal templates on Etsy.',
  },
  budget: {
    headline: 'Want a done-for-you budget template?',
    subtext: 'Browse our Excel budget spreadsheets on Etsy.',
  },
}

export default function EtsyCTA({ page }: EtsyCTAProps) {
  // Render nothing when the Etsy store URL is not configured.
  if (!ETSY_STORE_URL) {
    return null
  }

  const { headline, subtext } = COPY[page]

  return (
    <div
      className="my-8 flex flex-col items-start gap-4 bg-white sm:flex-row sm:items-center sm:justify-between"
      style={{
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '20px 24px',
      }}
    >
      <div>
        <h3 className="text-lg font-semibold text-navy">{headline}</h3>
        <p className="mt-1 text-muted">{subtext}</p>
      </div>
      <a
        href={ETSY_STORE_URL}
        target="_blank"
        rel="noopener nofollow"
        className="whitespace-nowrap rounded-btn border border-navy px-5 py-2.5 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
      >
        Visit our Etsy store →
      </a>
    </div>
  )
}
