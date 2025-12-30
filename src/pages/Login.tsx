import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { z } from "zod";
import { authService } from "@/services/auth.service";
import { createFormikValidator } from "@/utils/formValidation";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const response = await authService.login(values.email, values.password);

      toast.success(response.message || "OTP sent to your email");
      navigate(`/auth/verify-otp?email=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <Formik
        initialValues={{ email: "admin@servease.com", password: "Test123!@#" }}
        validate={createFormikValidator(loginSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
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
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-xs mt-0.5"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input-field"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-xs mt-0.5"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center mb-4">
          New service provider?
        </p>
        <Link
          to="/auth/register"
          className="w-full btn-secondary flex items-center justify-center"
        >
          Create Service Provider Account
        </Link>
      </div>
    </div>
  );
}
