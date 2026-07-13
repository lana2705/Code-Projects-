import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

const LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator' },
  { name: 'Paycheck Calculator', href: '/paycheck-calculator' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms', href: '/terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-navy"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-sm text-muted">
          © {year} {SITE_NAME}. Free to use. No data stored.
        </p>
      </div>
    </footer>
  )
}
