import RegisterForm from "@/components/forms/registerForm";
import { getUser } from "@/lib/actions/patient.action";
import Image from "next/image";
import Link from "next/link";

export default async function Register({
  params: { userId },
}: SearchParamProps) {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container my-auto">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="patient"
          height={1000}
          width={1000}
          className="mb-12 h-10 w-fit"
        />
        <RegisterForm user={user} />
        <div className="text-14-regular mt-20 flex justify-between ">
          <p className=" justify-items-end text-dark-600 xl:text-left">
            &copy; 2024 CarePulse{" "}
          </p>
          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
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
