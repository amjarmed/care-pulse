import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Success({
  params,
  searchParams,
}: SearchParamProps) {
  const { appointmentId } = await searchParams;
  const { userId } = await params;

  const appointment = await getAppointment((appointmentId! as string) || "");

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen  px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={1000}
            width={1000}
            className=" h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            height={300}
            width={280}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            your <span className="text-green-500">appointment request</span> has
            been booked
          </h2>
          <p> We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || ""}
              alt="doctor"
              height={100}
              width={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Doctor {doctor?.name || ""}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              height={100}
              width={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">
              {formatDateTime(appointment.schedule).dateTime}
            </p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Book another appointment
          </Link>
        </Button>

        <Footer />
      </div>
    </div>
  );
}
