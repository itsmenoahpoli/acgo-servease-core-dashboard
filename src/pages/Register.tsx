import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { z } from "zod";
import { StepIndicator } from "@/components/StepIndicator";
import { Button } from "@/components/ui";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import { createFormikValidator } from "@/utils/formValidation";
import { authService } from "@/services/auth.service";

// Step 1: Personal Information Schema
const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Step 2: Service Information Schema
const serviceInfoSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  serviceDescription: z.string().min(10, "Description must be at least 10 characters"),
  serviceCategory: z.string().min(1, "Please select a service category"),
  hourlyRate: z.string().min(1, "Hourly rate is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Hourly rate must be a positive number"
  ),
  experience: z.string().min(1, "Please select your experience level"),
});

// Step 3: Business Information Schema
const businessInfoSchema = z.object({
  accountType: z.enum(["service-provider-independent", "service-provider-business"], {
    required_error: "Please select an account type",
  }),
  businessName: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  businessAddress: z.string().optional(),
  taxId: z.string().optional(),
}).refine(
  (data) => {
    if (data.accountType === "service-provider-business") {
      return (
        data.businessName &&
        data.businessName.length > 0 &&
        data.businessRegistrationNumber &&
        data.businessRegistrationNumber.length > 0
      );
    }
    return true;
  },
  {
    message: "Business name and registration number are required for business accounts",
    path: ["businessName"],
  }
);

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
type ServiceInfoValues = z.infer<typeof serviceInfoSchema>;
type BusinessInfoValues = z.infer<typeof businessInfoSchema>;

type RegistrationFormValues = PersonalInfoValues & ServiceInfoValues & BusinessInfoValues;

const STEPS = [
  { label: "Personal", schema: personalInfoSchema },
  { label: "Service", schema: serviceInfoSchema },
  { label: "Business", schema: businessInfoSchema },
];

const STEP_LABELS = STEPS.map((step) => step.label);

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const initialValues: RegistrationFormValues = {
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Service Info
    serviceName: "",
    serviceDescription: "",
    serviceCategory: "",
    hourlyRate: "",
    experience: "",
    // Business Info
    accountType: "service-provider-independent" as const,
    businessName: "",
    businessRegistrationNumber: "",
    businessAddress: "",
    taxId: "",
  };

  const validateCurrentStep = (values: RegistrationFormValues) => {
    const currentSchema = STEPS[currentStep - 1].schema;
    try {
      currentSchema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        return errors;
      }
      return {};
    }
  };

  const handleNext = (
    values: RegistrationFormValues,
    setErrors: FormikHelpers<RegistrationFormValues>["setErrors"]
  ) => {
    const errors = validateCurrentStep(values);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (
    values: RegistrationFormValues,
    { setSubmitting, setStatus }: FormikHelpers<RegistrationFormValues>
  ) => {
    try {
      await authService.register(values);
      
      toast.success("Registration successful! Please check your email to verify your account.");
      navigate("/auth/login");
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Registration failed. Please try again.";
      setStatus(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = (values: RegistrationFormValues) => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className="input-field"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-600 text-xs mt-0.5" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className="input-field"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-600 text-xs mt-0.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <Field
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <Field
                type="tel"
                name="phone"
                placeholder="+1 234 567 8900"
                className="input-field"
              />
              <ErrorMessage name="phone" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password *
              </label>
              <Field
                type="password"
                name="password"
                placeholder="At least 8 characters"
                className="input-field"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="input-field"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Service Name *
              </label>
              <Field
                type="text"
                name="serviceName"
                placeholder="e.g., Plumbing, Electrical, Cleaning"
                className="input-field"
              />
              <ErrorMessage name="serviceName" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Service Description *
              </label>
              <Field
                as="textarea"
                name="serviceDescription"
                placeholder="Describe your service in detail..."
                rows={4}
                className="input-field"
              />
              <ErrorMessage name="serviceDescription" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Service Category *
              </label>
              <Field
                as="select"
                name="serviceCategory"
                className="input-field"
              >
                <option value="">Select a category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
                <option value="landscaping">Landscaping</option>
                <option value="handyman">Handyman</option>
                <option value="painting">Painting</option>
                <option value="carpentry">Carpentry</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="serviceCategory" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Hourly Rate ($) *
              </label>
              <Field
                type="number"
                name="hourlyRate"
                placeholder="50"
                min="0"
                step="0.01"
                className="input-field"
              />
              <ErrorMessage name="hourlyRate" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Experience Level *
              </label>
              <Field
                as="select"
                name="experience"
                className="input-field"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="experienced">Experienced (5-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </Field>
              <ErrorMessage name="experience" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Account Type *
              </label>
              <Field
                as="select"
                name="accountType"
                className="input-field"
              >
                <option value="service-provider-independent">Independent Provider</option>
                <option value="service-provider-business">Business</option>
              </Field>
              <ErrorMessage name="accountType" component="div" className="text-red-600 text-xs mt-0.5" />
            </div>

            {values.accountType === "service-provider-business" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <Field
                    type="text"
                    name="businessName"
                    placeholder="ABC Services Inc."
                    className="input-field"
                  />
                  <ErrorMessage name="businessName" component="div" className="text-red-600 text-xs mt-0.5" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Business Registration Number *
                  </label>
                  <Field
                    type="text"
                    name="businessRegistrationNumber"
                    placeholder="REG-123456"
                    className="input-field"
                  />
                  <ErrorMessage name="businessRegistrationNumber" component="div" className="text-red-600 text-xs mt-0.5" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Business Address
                  </label>
                  <Field
                    type="text"
                    name="businessAddress"
                    placeholder="123 Main St, City, State, ZIP"
                    className="input-field"
                  />
                  <ErrorMessage name="businessAddress" component="div" className="text-red-600 text-xs mt-0.5" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tax ID (EIN)
                  </label>
                  <Field
                    type="text"
                    name="taxId"
                    placeholder="12-3456789"
                    className="input-field"
                  />
                  <ErrorMessage name="taxId" component="div" className="text-red-600 text-xs mt-0.5" />
                </div>
              </>
            )}

            {values.accountType === "service-provider-independent" && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-sm text-primary-700">
                <p className="font-medium mb-1">Independent Provider Account</p>
                <p className="text-xs">
                  As an independent provider, you'll be able to offer your services directly to customers.
                  You can upgrade to a business account later if needed.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Create Service Provider Account
        </h1>
        <p className="text-sm text-gray-600">
          Complete the steps below to register your account
        </p>
      </div>

      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEPS.length}
        stepLabels={STEP_LABELS}
      />

      <Formik
        initialValues={initialValues}
        validate={validateCurrentStep}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, status, setErrors }) => (
          <Form className="space-y-6">
            {status && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                {status}
              </div>
            )}

            {renderStepContent(values)}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    className="flex items-center gap-2"
                  >
                    <HiArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => handleNext(values, setErrors)}
                    className="flex items-center gap-2"
                  >
                    Next
                    <HiArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? "Registering..." : "Complete Registration"}
                  </Button>
                )}
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-xs text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

