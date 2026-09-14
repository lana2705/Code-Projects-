'use client'

import { useState } from 'react'

interface MethodologyNoteProps {
  children: React.ReactNode
}

export default function MethodologyNote({ children }: MethodologyNoteProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="bg-transparent p-0 text-[13px] text-[#6B7280] transition-colors hover:text-navy"
      >
        How we calculate this {open ? '▲' : '▾'}
      </button>
      {open && (
        <div className="mt-3 rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] px-5 py-4 text-[13px] leading-[1.7] text-[#6B7280]">
          {children}
        </div>
      )}
    </div>
  )
}
