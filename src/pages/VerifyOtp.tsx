import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { z } from "zod";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { createFormikValidator } from "@/utils/formValidation";
import { toast } from "react-toastify";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyOtp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setToken, setRefreshToken } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const userEmail = searchParams.get("email");

    if (!userEmail) {
      toast.error("Invalid session. Please login again.");
      navigate("/auth/login");
      return;
    }

    setEmail(userEmail);
  }, [searchParams, navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (
    values: OtpFormValues,
    { setSubmitting, setStatus }: FormikHelpers<OtpFormValues>
  ) => {
    if (!email) {
      setStatus("Invalid session. Please login again.");
      return;
    }

    try {
      const { accessToken, refreshToken, user } = await authService.verifyOtp({
        email,
        otp: values.otp,
      });

      setToken(accessToken);
      setRefreshToken(refreshToken);
      
      if (user) {
        setUser(user);
        toast.success("Login successful!");

        if (user.userType === "admin") {
          navigate("/admin/dashboard");
        } else if (user.userType === "service-provider") {
          navigate("/provider/dashboard");
        } else {
          setStatus("Invalid user type");
        }
      } else {
        try {
          const response = await authService.getCurrentUser();
          if (response?.user) {
            setUser(response.user);
            toast.success("Login successful!");

            if (response.user.userType === "admin") {
              navigate("/admin/dashboard");
            } else if (response.user.userType === "service-provider") {
              navigate("/provider/dashboard");
            } else {
              setStatus("Invalid user type");
            }
          } else {
            toast.error("Failed to fetch user information");
          }
        } catch (fetchError) {
          toast.error("Failed to fetch user information");
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Invalid OTP. Please try again.";
      setStatus(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email || resendCooldown > 0) return;

    setIsResending(true);
    try {
      await authService.resendOtp(email);
      setResendCooldown(60); // 60 second cooldown
      toast.success("OTP has been resent to your email");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <div className="w-full">
        <div className="text-center py-8">
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Verify Your Email
        </h1>
        <p className="text-sm text-gray-600">
          {email
            ? `We've sent a 6-digit code to ${email}`
            : "We've sent a 6-digit code to your email"}
        </p>
      </div>

      <Formik
        initialValues={{ otp: "" }}
        validate={createFormikValidator(otpSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status, values }) => (
          <Form className="space-y-4">
            {status && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                {status}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Enter OTP Code
              </label>
              <Field
                type="text"
                name="otp"
                placeholder="000000"
                maxLength={6}
                className="input-field text-center text-2xl tracking-widest font-mono"
                autoComplete="one-time-code"
                autoFocus
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-600 text-xs mt-0.5"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || values.otp.length !== 6}
              className="w-full btn-primary"
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center space-y-2">
              <p className="text-xs text-gray-600">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending || resendCooldown > 0}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : isResending
                  ? "Sending..."
                  : "Resend OTP"}
              </button>
            </div>

            <div className="text-center pt-4">
              <Link
                to="/auth/login"
                className="text-xs text-gray-600 hover:text-gray-700 font-medium transition-colors"
              >
                ← Back to login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

