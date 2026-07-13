'use client'

import { useState } from 'react'

const inputClass =
  'w-full rounded-input border border-border px-3 py-2 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy'
const labelClass = 'mb-1 block text-sm font-medium text-navy'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // MVP: no backend. Open the user's mail client with a prefilled message.
    const subject = encodeURIComponent(`Message from ${name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ''}`,
    )
    window.location.href = `mailto:hello@fincalchub.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="rounded-btn bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#16264d]"
      >
        Send message
      </button>
      {submitted && (
        <p className="text-sm text-accent">
          Thanks! Your email client should have opened with your message ready
          to send.
        </p>
      )}
    </form>
  )
}
