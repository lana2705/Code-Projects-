# Finance Beacon

Your money, clearly calculated.

Finance Beacon is a pure client-side tool site — no accounts, no database, no
backend. Every calculation runs in the browser; your numbers never leave your
device.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** (icons)
- **next-sitemap** (sitemap + robots.txt)
- Deploys to **Vercel**

## Calculators

- **Debt Payoff Calculator** — compare the avalanche vs snowball methods, see
  your debt-free date, total interest, and a payoff schedule.
- **Paycheck Calculator** — estimate take-home pay after federal tax (2026
  brackets), state tax, and FICA, with 401(k) and pre-tax deductions.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env.local` file. All values may be left empty — every component
handles the empty/unconfigured case gracefully.

```bash
NEXT_PUBLIC_GA4_ID=              # Google Analytics 4 measurement ID
NEXT_PUBLIC_ADSENSE_CLIENT_ID=   # Google AdSense client ID
NEXT_PUBLIC_ETSY_STORE_URL=      # Etsy store URL for the store CTA
NEXT_PUBLIC_SITE_URL=            # Canonical site URL (used for SEO + sitemap)
NEXT_PUBLIC_FORMSPREE_ENDPOINT=  # Formspree form endpoint for the contact form
```

- With `NEXT_PUBLIC_GA4_ID` empty, the GA4 script is not injected.
- With `NEXT_PUBLIC_ADSENSE_CLIENT_ID` empty (or in development), ad slots show
  a placeholder instead of a live ad.
- With `NEXT_PUBLIC_ETSY_STORE_URL` empty, the Etsy CTA renders nothing.
- With `NEXT_PUBLIC_SITE_URL` empty, SEO metadata falls back to a placeholder
  URL.
- With `NEXT_PUBLIC_FORMSPREE_ENDPOINT` empty, the contact form falls back to
  opening the visitor's email client with a prefilled message instead of
  posting to Formspree.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build (runs next-sitemap on postbuild)
npm run start    # serve the production build
npm run lint     # ESLint
```

## Project structure

```
app/                     App Router pages (home, calculators, static pages)
components/
  layout/                Navbar, Footer
  calculators/           Calculator inputs + results panels
  shared/                AdSenseSlot, EtsyCTA, FAQAccordion
lib/
  constants.ts
  format.ts
  calculators/           Pure calculation logic (debtPayoff, paycheck, tax rates)
types/                   Shared TypeScript types
```

## Notes

- Tax figures use 2026 federal brackets and flat state income-tax rates; results
  are estimates, not tax advice.
- All charts are pure CSS (no chart libraries).
