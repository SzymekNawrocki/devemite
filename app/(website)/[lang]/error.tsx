'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center">
      <Container>
        <div className="flex flex-col items-center text-center gap-6">
          <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Error
          </p>
          <SectionTitle text="Something went wrong" tag="h1" />
          <p className="text-muted-foreground text-lg max-w-md">
            An unexpected error occurred. Please try again.
          </p>
          <Button onClick={reset}>Try again</Button>
        </div>
      </Container>
    </main>
  )
}
