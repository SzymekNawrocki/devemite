import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/lib/validation/contact'

describe('contactSchema', () => {
  const valid = {
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    message: 'This is a valid test message.',
  }

  it('accepts valid data', () => {
    expect(() => contactSchema.parse(valid)).not.toThrow()
  })

  it('rejects name shorter than 2 characters', () => {
    const result = contactSchema.safeParse({ ...valid, name: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('name')
    }
  })

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
    }
  })

  it('rejects message shorter than 10 characters', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'Too short' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('message')
    }
  })

  it('rejects empty name', () => {
    const result = contactSchema.safeParse({ ...valid, name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects empty email', () => {
    const result = contactSchema.safeParse({ ...valid, email: '' })
    expect(result.success).toBe(false)
  })

  it('rejects empty message', () => {
    const result = contactSchema.safeParse({ ...valid, message: '' })
    expect(result.success).toBe(false)
  })
})
