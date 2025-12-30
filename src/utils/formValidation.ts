import { z } from 'zod'
import { FormikErrors, FormikValues } from 'formik'

export function toFormikErrors<T extends FormikValues>(
  zodError: z.ZodError
): FormikErrors<T> {
  const errors: FormikErrors<T> = {}
  
  zodError.errors.forEach((error) => {
    const path = error.path.join('.')
    if (path) {
      ;(errors as any)[path] = error.message
    }
  })
  
  return errors
}

export function createFormikValidator<T extends z.ZodTypeAny>(
  schema: T
) {
  return async (values: z.infer<T>): Promise<FormikErrors<z.infer<T>>> => {
    try {
      await schema.parseAsync(values)
      return {}
    } catch (error) {
      if (error instanceof z.ZodError) {
        return toFormikErrors<z.infer<T>>(error)
      }
      return {}
    }
  }
}

