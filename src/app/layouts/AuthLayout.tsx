import { ReactNode } from 'react'
import splashBg from '@/assets/splash-bg.jpg'
import brandLogo from '@/assets/brand-logo.jpeg'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${splashBg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <img 
            src={brandLogo} 
            alt="Brand Logo" 
            className="max-w-xs w-full h-auto mb-8 drop-shadow-lg"
          />
        </div>
      </div>
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
    </div>
  )
}

