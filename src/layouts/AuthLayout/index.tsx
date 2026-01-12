import { ReactNode } from "react";
import { SplashPanel } from "./SplashPanel";
import { FormContainer } from "./FormContainer";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <SplashPanel />
      <FormContainer>{children}</FormContainer>
    </div>
  );
}

