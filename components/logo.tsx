import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  logoStyle?: string;

  width?: number;
  height?: number;
}
function Logo({ logoStyle, width, height }: LogoProps) {
  return (
    <>
      <Link href="/" className="cursor-pointer">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="patient"
          height={height || 1000}
          width={width || 1000}
          className={logoStyle || "mb-12 h-10 w-fit"}
        />
      </Link>
    </>
  );
}

export default Logo;
