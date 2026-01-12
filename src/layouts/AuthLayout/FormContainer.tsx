import { ReactNode } from "react";
import brandLogo from "@/assets/brand-logo.jpeg";

interface FormContainerProps {
  children: ReactNode;
}

export function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-md">
        <div className="lg:hidden mb-8 flex justify-center">
          <img
            src={brandLogo}
            alt="Brand Logo"
            className="max-w-[200px] h-auto"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

