import Footer from "@/components/Footer";
import PatientForm from "@/components/forms/patientForm";
import PasskeyModal from "@/components/passkeyModal";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const { admin } = await searchParams;
  const isAdmin = admin === "true";
  console.log(isAdmin);

  return (
    <div className="flex h-screen max-h-screen ">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between ">
            <Footer />
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
