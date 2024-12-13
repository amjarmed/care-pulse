import { StatusIcon } from "@/lib/constants";
import clsx from "clsx";
import Image from "next/image";

interface StatusBadgeProps {
  status: string;
}
function StatusBadge({ status }: StatusBadgeProps) {
  let statusBg;
  switch (status) {
    case "scheduled":
      statusBg = "bg-green-600";
      break;
    case "cancelled":
      statusBg = "bg-red-600";
      break;
    case "pending":
      statusBg = "bg-blue-600";
      break;
    default:
      break;
  }
  return (
    <div
      className={clsx(
        "flex space-x-1 w-full justify-center items-center text-14-medium rounded-xl px-2 py-1",
        statusBg
      )}
    >
      <Image
        src={StatusIcon[status as keyof typeof StatusIcon]}
        alt={status}
        width={24}
        height={24}
        className="w-3 h-fit"
      />
      <p
        className={clsx("text-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-red-500": status === "cancelled",
          "text-blue-500": status === "pending",
        })}
      >
        {" "}
        {status}
      </p>
    </div>
  );
}

export default StatusBadge;
