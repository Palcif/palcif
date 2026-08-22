import type { FieldErrors, Resolver } from 'react-hook-form'
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'errorRequired'),
  email: z.string().trim().min(1, 'errorRequired').email('errorEmailInvalid'),
  subject: z.string().trim().min(1, 'errorRequired'),
  message: z.string().trim().min(1, 'errorRequired'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * Manual react-hook-form resolver for the zod schema above. Written by hand
 * instead of pulling in @hookform/resolvers, since react-hook-form and zod
 * are the only two form-related dependencies already declared in
 * package.json.
 */
export const contactFormResolver: Resolver<ContactFormValues> = (values) => {
  const result = contactFormSchema.safeParse(values)
  if (result.success) {
    return { values: result.data, errors: {} }
  }

  const errors: FieldErrors<ContactFormValues> = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (typeof field !== 'string' || !(field in contactFormSchema.shape)) continue
    const key = field as keyof ContactFormValues
    if (!errors[key]) {
      errors[key] = { type: issue.code, message: issue.message }
    }
  }
  return { values: {}, errors }
}
