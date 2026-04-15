import { describe, it, expect, vi } from 'vitest'

// Mock next-sanity before the module under test is imported.
// createClient is called at module level, so the mock must be in place first.
// vi.mock() calls are hoisted by Vitest automatically.
vi.mock('next-sanity', () => ({
  createClient: vi.fn(() => ({
    create: vi.fn().mockResolvedValue({}),
  })),
}))

vi.mock('resend', () => ({
  // Must be a regular function — arrow functions cannot be used as constructors (new Resend(...))
  Resend: vi.fn(function (this: { emails: { send: ReturnType<typeof vi.fn> } }) {
    this.emails = {
      send: vi.fn().mockResolvedValue({ data: null, error: null }),
    }
  }),
}))

// Prevent assertValue() from throwing due to missing env vars in test env
vi.mock('@/sanity/env', () => ({
  apiVersion: '2024-01-01',
  dataset: 'test',
  projectId: 'test-project-id',
}))

import { submitContactForm } from '@/app/actions/contact'

const validData = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  message: 'This is a valid test message.',
}

describe('submitContactForm', () => {
  it('returns success:false when honeypot field is filled', async () => {
    const result = await submitContactForm({ ...validData, website: 'https://spam.com' })
    expect(result).toEqual({ success: false, message: 'Spam detected.' })
  })

  it('returns success:false when name is too short', async () => {
    const result = await submitContactForm({ ...validData, name: 'A' })
    expect(result.success).toBe(false)
    expect(result.message).toBe('Invalid form data. Please check your inputs.')
  })

  it('returns success:false when email is invalid', async () => {
    const result = await submitContactForm({ ...validData, email: 'not-an-email' })
    expect(result.success).toBe(false)
    expect(result.message).toBe('Invalid form data. Please check your inputs.')
  })

  it('returns success:false when message is too short', async () => {
    const result = await submitContactForm({ ...validData, message: 'Hi' })
    expect(result.success).toBe(false)
    expect(result.message).toBe('Invalid form data. Please check your inputs.')
  })

  it('returns success:true for valid data', async () => {
    const result = await submitContactForm(validData)
    expect(result).toEqual({ success: true })
  })
})
