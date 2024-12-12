import Footer from "@/components/Footer";
import RegisterForm from "@/components/forms/registerForm";
import { getUser } from "@/lib/actions/patient.action";
import Image from "next/image";
import Link from "next/link";

export default async function Register({ params }: SearchParamProps) {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container ">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
        </Link>

        <RegisterForm user={user} />
        <Footer />
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-[360px]"
      />
    </div>
  );
}
