'use client'

import { parseCurrencyInput, formatCurrencyInput } from '@/lib/format'

interface CurrencyInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * A dollar-amount text input that formats its value as currency ("$1,234.50")
 * when the field loses focus, and reverts to a plain, easily editable number
 * while focused. The raw string is reported to the parent via onChange; parse
 * with parseCurrencyInput when reading it back.
 */
export default function CurrencyInput({
  value,
  onChange,
  placeholder,
  className,
  id,
  'aria-label': ariaLabel,
}: CurrencyInputProps) {
  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => {
        // Strip formatting so the raw number is easy to edit.
        const n = parseCurrencyInput(value)
        if (!isNaN(n)) onChange(String(n))
      }}
      onBlur={() => {
        // Format as a monetary value on blur.
        if (value.trim() === '') return
        onChange(formatCurrencyInput(value))
      }}
    />
  )
}
