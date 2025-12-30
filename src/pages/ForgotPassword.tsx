import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { z } from 'zod'
import { authService } from '@/services/auth.service'
import { createFormikValidator } from '@/utils/formValidation'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      setError('')
      await authService.requestPasswordReset(values.email)
      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Check your email</h1>
          <p className="text-sm text-gray-600">
            We've sent a password reset OTP to your email address.
          </p>
        </div>
        <div className="bg-primary-50 border border-primary-200 text-primary-700 px-3 py-2 rounded-lg text-xs mb-4">
          Please check your inbox and follow the instructions to reset your password.
        </div>
        <Link
          to="/auth/login"
          className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          ← Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Forgot password?</h1>
        <p className="text-sm text-gray-600">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>
      </div>

      <Formik
        initialValues={{ email: '' }}
        validate={createFormikValidator(forgotPasswordSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email address
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary"
            >
              {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <div className="text-center">
              <Link
                to="/auth/login"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                ← Back to login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

