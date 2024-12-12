"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckIcon, Hourglass, X } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointments = {
  id: string;
  date: Appointment;
  patient: Appointment;
  status: Appointment;
  doctor: Appointment;
  actions: string;
  select: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    id: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient.name}</p>;
    },
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-medium">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Status</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div
          className={clsx(
            "flex space-x-1 w-fit justify-center items-center text-14-medium rounded-xl px-2 py-1",
            {
              "bg-red-500": appointment.status === "cancelled",
              "bg-green-500": appointment.status === "scheduled",
              "bg-yellow-800": appointment.status === "pending",
            }
          )}
        >
          {(appointment.status === "cancelled" && <CheckIcon size={12} />) ||
            (appointment.status === "scheduled" && <Hourglass size={12} />) ||
            (appointment.status === "pending" && <X size={12} />)}
          <p> {appointment.status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.primaryPhysician}</p>;
    },
  },
  {
    id: "actions",
    header: () => <p className="text-center">Actions</p>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="link"
            className="text-green-500 hover:no-underline"
            onClick={() => {}}
          >
            Schedule
          </Button>
          <Button
            variant="link"
            className="hover:no-underline text-gray-400"
            onClick={() => {}}
          >
            Cancel
          </Button>
        </div>
      );
    },
  },

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
