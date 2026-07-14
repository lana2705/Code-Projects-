'use client'

import { parseCurrencyInput, formatCurrencyInput } from '@/lib/format'

interface CurrencyInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
  'aria-label'?: string
  /** Show a leading "$" adornment; the value then formats without a "$". */
  prefix?: boolean
}

/**
 * A dollar-amount text input that formats its value as currency when the field
 * loses focus, and reverts to a plain, easily editable number while focused.
 * The raw string is reported to the parent via onChange; parse with
 * parseCurrencyInput when reading it back.
 */
export default function CurrencyInput({
  value,
  onChange,
  placeholder,
  className,
  id,
  'aria-label': ariaLabel,
  prefix = false,
}: CurrencyInputProps) {
  const input = (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      className={prefix ? `${className ?? ''} pl-7` : className}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => {
        // Strip formatting so the raw number is easy to edit.
        const n = parseCurrencyInput(value)
        if (!isNaN(n)) onChange(String(n))
      }}
      onBlur={() => {
        // Format as a monetary value on blur.
        if (value.trim() === '') return
        onChange(formatCurrencyInput(value, !prefix))
      }}
    />
  )

  if (!prefix) return input

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        $
      </span>
      {input}
    </div>
  )
}
