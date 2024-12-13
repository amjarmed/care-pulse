"use client";
import AppointmentForm from "@/components/forms/appointmentForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "@/types/appwrite.types";
import { useState } from "react";

interface AppointmentModalProps {
  type: "schedule" | "cancel";
  userId: string;
  patientId: string;
  title: string;
  description: string;
  appointment?: Appointment;
}
const AppointmentModal = ({
  type,
  userId,
  patientId,
  title,
  description,
  appointment,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type === "schedule" ? "Schedule" : "Cancel"}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <AppointmentForm
          type={type}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
