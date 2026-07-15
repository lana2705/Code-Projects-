'use client'

import { useState } from 'react'
import { FORMSPREE_ENDPOINT } from '@/lib/constants'

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'
const errorInputClass = 'border-error focus:border-error focus:ring-error'
const labelClass = 'mb-1 block text-sm font-medium text-navy'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [status, setStatus] = useState<Status>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {}
    if (!name.trim()) errors.name = 'Please enter your name.'
    if (!email.trim()) {
      errors.email = 'Please enter your email.'
    } else if (!EMAIL_RE.test(email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!message.trim()) errors.message = 'Please enter a message.'
    return errors
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setStatus('idle')
      return
    }

    // No Formspree endpoint configured: fall back to opening the user's mail
    // client with a prefilled message — no backend involved.
    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Message from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:hello@thefinancebeacon.com?subject=${subject}&body=${body}`
      setStatus('success')
      resetForm()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target as HTMLFormElement),
      })

      if (response.ok) {
        setStatus('success')
        setFieldErrors({})
        resetForm()
        return
      }

      const data = await response.json().catch(() => null)
      const errorMessage =
        data?.errors
          ?.map((err: { message: string }) => err.message)
          .join(', ') ||
        'Something went wrong sending your message. Please try again.'
      setFormError(errorMessage)
      setStatus('error')
    } catch {
      setFormError(
        'Something went wrong sending your message. Please check your connection and try again.',
      )
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          className={`${inputClass} ${fieldErrors.name ? errorInputClass : ''}`}
        />
        {fieldErrors.name && (
          <p id="name-error" className="mt-1 text-xs text-error">
            {fieldErrors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          className={`${inputClass} ${fieldErrors.email ? errorInputClass : ''}`}
        />
        {fieldErrors.email && (
          <p id="email-error" className="mt-1 text-xs text-error">
            {fieldErrors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          className={`${inputClass} ${fieldErrors.message ? errorInputClass : ''}`}
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1 text-xs text-error">
            {fieldErrors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#16264d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>

      <div aria-live="polite">
        {status === 'success' && (
          <p className="text-sm text-accent">
            {FORMSPREE_ENDPOINT
              ? "Thanks for reaching out! We'll get back to you soon."
              : 'Thanks! Your email client should have opened with your message ready to send.'}
          </p>
        )}
        {status === 'error' && formError && (
          <p className="text-sm text-error">{formError}</p>
        )}
      </div>
    </form>
  )
}
