import { ADSENSE_CLIENT_ID } from '@/lib/constants'

interface AdSenseSlotProps {
  slot: string
}

export default function AdSenseSlot({ slot }: AdSenseSlotProps) {
  const isProduction = process.env.NODE_ENV === 'production'

  // Never render a live ad in development, or when no client ID is configured.
  if (!isProduction || !ADSENSE_CLIENT_ID) {
    return (
      <div
        className="my-8 flex min-h-[120px] items-center justify-center rounded-input px-6 py-8 text-center text-sm text-muted"
        style={{
          border: '1px dashed #E5E7EB',
          backgroundColor: '#F9FAFB',
        }}
        aria-hidden="true"
      >
        Ad — displays here in production once AdSense is approved
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle my-8 block"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
