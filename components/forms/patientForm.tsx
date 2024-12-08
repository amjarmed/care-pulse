"use client";

import CustomFormField from "@/components/forms/CustomformField";
import SubmitButton from "@/components/submitButton";
import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.action";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum formFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  PHONE_INPUT = "phoneInput",
  SKELETON = "skeleton",
  EMAIL_INPUT = "email",
}

function PatientForm() {
  // loader
  const [isLoading, setLoading] = useState(false);
  // router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);

      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section>
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first Appointment.</p>
        </section>
        <CustomFormField
          control={form.control}
          placeholder="John Doe"
          label="Full name"
          name="name"
          fieldType={formFieldType.INPUT}
          icon="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          placeholder="yourname@email.com"
          label="Email"
          name="email"
          fieldType={formFieldType.EMAIL_INPUT}
          icon="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          placeholder="(123) 456-7890"
          label="Phone"
          name="phone"
          fieldType={formFieldType.PHONE_INPUT}
        />

        <SubmitButton isLoading={isLoading} onClick={() => onSubmit}>
          Get started
        </SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
