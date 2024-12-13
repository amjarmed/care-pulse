"use client";

import CustomFormField from "@/components/forms/CustomformField";
import SubmitButton from "@/components/submitButton";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { updatedAppointment } from "@/lib/actions/patient.action";
import { Doctors, formFieldType } from "@/lib/constants";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AppointmentFormProps {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  setOpen?: (open: boolean) => void;
  appointment?: Appointment;
}
function AppointmentForm({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: AppointmentFormProps) {
  // loader
  const [isLoading, setLoading] = useState(false);
  // router
  const router = useRouter();

  let btnLabel: string;

  switch (type) {
    case "create":
      btnLabel = "Request Appointment";
      break;
    case "cancel":
      btnLabel = "Cancel Appointment";
      break;
    case "schedule":
      btnLabel = "Schedule Appointment";
      break;
    default:
      break;
  }
  const AppointmentFormValidation = getAppointmentSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    console.log("start submitting...");
    setLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";

        break;
      case "cancel":
        status = "cancelled";

        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const AppointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        console.log("patient", patientId);
        console.log({
          status: status as Status,
        });

        const appointment = await createAppointment(AppointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
            reason: values?.reason,
            note: values?.note,
          },
          type,
        };

        console.log({ appointmentToUpdate });

        const updatedAppnt = await updatedAppointment(appointmentToUpdate);

        if (updatedAppnt) {
          setOpen?.(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="space-y-4 mb-12">
            <h1 className="header">New Appointment 👩‍⚕️</h1>
            <p className="text-dark-700">
              Request new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              placeholder="Select a doctor"
              label="Doctor"
              name="primaryPhysician"
              fieldType={formFieldType.SELECT}
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              placeholder="yourname@email.com"
              label="Expect appointment date"
              name="schedule"
              fieldType={formFieldType.DATE_PICKER}
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm a"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                placeholder="Enter the reason of the appointment"
                label="Reason for the appointment"
                name="reason"
                fieldType={formFieldType.TEXTAREA}
              />
              <CustomFormField
                control={form.control}
                placeholder="Enter notes"
                label="Notes"
                name="note"
                fieldType={formFieldType.TEXTAREA}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            placeholder="Enter the reason of the cancellation"
            label="Reason for the cancellation"
            name="cancellationReason"
            fieldType={formFieldType.TEXTAREA}
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {btnLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
