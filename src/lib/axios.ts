import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";

const setContentType = (payloadType?: string): string => {
  if (payloadType === "form-data") {
    return "multipart/form-data";
  }
  return "application/json";
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get token from Zustand store
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const payloadType = (config as any).payloadType;
    config.headers["Content-Type"] = setContentType(payloadType);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      const { status } = error.response as AxiosResponse;
      const currentPath = window.location.pathname;

      if (status === 401) {
        // Only redirect to login if we're not already on an auth page
        // This prevents redirect loops and allows login/register pages to handle 401 errors themselves
        const isAuthPage =
          currentPath.startsWith("/auth/login") ||
          currentPath.startsWith("/auth/register") ||
          currentPath.startsWith("/auth/forgot-password") ||
          currentPath.startsWith("/auth/verify-otp");

        if (!isAuthPage) {
          // Clear auth state from Zustand store
          useAuthStore.getState().logout();
          window.location.href = "/auth/login";
        }
        // If we're on an auth page, let the page handle the 401 error (e.g., show error message)
      }

      if (status === 500) {
        toast.error(
          "An error occured while processing your request. Please try again later."
        );
      }
    } else {
      // Handle network errors
      toast.error("Network error or server is unreachable. Please try again.");
    }

    return Promise.reject(error);
  }
);
