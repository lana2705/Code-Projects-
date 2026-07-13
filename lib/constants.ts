export const SITE_NAME = 'FinCalcHub'

export const SITE_TAGLINE = 'Free Finance Calculators. Built for Real Life.'

export const ETSY_STORE_URL = process.env.NEXT_PUBLIC_ETSY_STORE_URL ?? ''

export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? ''

// Falls back when the env var is unset OR empty (empty string is the default
// placeholder in .env.local), so metadataBase always receives a valid URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
