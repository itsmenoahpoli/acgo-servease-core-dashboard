import splashBg from "@/assets/splash-bg.jpg";
import brandLogo from "@/assets/brand-logo.jpeg";

export function SplashPanel() {
  return (
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
  );
}

