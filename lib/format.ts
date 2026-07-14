export function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/** Parse a user-entered currency string ("$1,234.50") to a number, or NaN. */
export function parseCurrencyInput(str: string): number {
  if (!str) return NaN
  const cleaned = str.replace(/[^0-9.-]/g, '')
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return NaN
  return parseFloat(cleaned)
}

/** Format a user-entered value as a display currency string ("$1,234.50"). */
export function formatCurrencyInput(str: string): string {
  const n = parseCurrencyInput(str)
  if (isNaN(n)) return str
  return `$${n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
