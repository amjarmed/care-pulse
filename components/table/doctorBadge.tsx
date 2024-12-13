import { Doctors } from "@/lib/constants";
import Image from "next/image";

interface DoctorBadgeProps {
  doctorName: string;
}

const DoctorBadge = ({ doctorName }: DoctorBadgeProps) => {
  const doctor = Doctors.find((doctor) => doctor.name === doctorName);
  return (
    <div className="flex items-center gap-3 ">
      <Image
        src={doctor?.image || ""}
        alt={doctorName}
        width={100}
        height={100}
        className="size-8 rounded-full bg-white p-[0.25px] shadow-sm"
      />
      <p className="whitespace-nowrap">{doctorName}</p>
    </div>
  );
};

export default DoctorBadge;
