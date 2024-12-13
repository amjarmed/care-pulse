"use client";

import AppointmentModal from "@/components/table/appointmentModal";
import DoctorBadge from "@/components/table/doctorBadge";
import StatusBadge from "@/components/table/statusBadge";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Appointment>[] = [
  {
    id: "id",
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => (
      <DoctorBadge doctorName={row.original.primaryPhysician} />
    ),
  },

  {
    id: "actions",
    header: () => <div className="pl-4 text-center">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            userId={data.patient.userId}
            patientId={data.patient.$id}
            appointment={data}
            title="Schedule Appointment"
            description="Please fill in the following details to schedule an appointment"
          />
          <AppointmentModal
            type="cancel"
            userId={data.patient.userId}
            patientId={data.patient.$id}
            appointment={data}
            title="Cancel Appointment"
            description="Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    },
  },
];
