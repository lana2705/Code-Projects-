export const SITE_NAME = 'Finance Beacon'

export const SITE_TAGLINE = 'Your Money, Clearly Calculated.'

export const ETSY_STORE_URL = process.env.NEXT_PUBLIC_ETSY_STORE_URL ?? ''

export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? ''

export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ''

// Falls back when the env var is unset OR empty (empty string is the default
// placeholder in .env.local), so metadataBase always receives a valid URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://myfinancebeacon.com'
