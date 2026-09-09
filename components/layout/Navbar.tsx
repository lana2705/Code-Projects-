'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

const CALCULATORS = [
  { name: 'Paycheck Calculator', href: '/paycheck-calculator' },
  { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator' },
  { name: 'Savings Calculator', href: '/savings-calculator' },
  { name: 'Budget Calculator', href: '/budget-calculator' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [calcOpen, setCalcOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const linkClass = (href: string) =>
    `transition-colors hover:text-navy ${
      isActive(href) ? 'font-semibold text-navy' : 'text-muted'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-bold text-navy"
          onClick={() => setMobileOpen(false)}
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setCalcOpen(true)}
            onMouseLeave={() => setCalcOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCalcOpen((o) => !o)}
              className={`flex items-center gap-1 ${
                CALCULATORS.some((c) => isActive(c.href))
                  ? 'font-semibold text-navy'
                  : 'text-muted'
              } transition-colors hover:text-navy`}
              aria-expanded={calcOpen}
            >
              Calculators
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            {calcOpen && (
              <div className="absolute left-0 top-full w-64 rounded-card border border-border bg-white py-2 shadow-lg">
                {CALCULATORS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className={`block px-4 py-2 hover:bg-surface ${
                      isActive(c.href)
                        ? 'font-semibold text-navy'
                        : 'text-muted'
                    }`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className={linkClass('/blog')}>
            Blog
          </Link>
          <Link href="/about" className={linkClass('/about')}>
            About
          </Link>
          <Link href="/contact" className={linkClass('/contact')}>
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-navy md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="flex flex-col px-4 py-2">
            <Link
              href="/"
              className={`py-3 ${linkClass('/')}`}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <div className="py-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Calculators
              </span>
              {CALCULATORS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={`block py-3 pl-3 ${linkClass(c.href)}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className={`py-3 ${linkClass('/blog')}`}
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`py-3 ${linkClass('/about')}`}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`py-3 ${linkClass('/contact')}`}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
