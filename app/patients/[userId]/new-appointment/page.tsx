import Footer from "@/components/Footer";
import AppointmentForm from "@/components/forms/appointmentForm";
import { getPatient } from "@/lib/actions/patient.action";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({ params }: SearchParamProps) {
  const { userId } = await params;
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view_new_appointment", patient.name);

  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="patient"
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit"
            />
          </Link>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <Footer />
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
