"use client";

import CustomFormField from "@/components/forms/CustomformField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function PatientForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          name="fullname"
          type="text"
          icon="User"
        />
        <CustomFormField
          control={form.control}
          placeholder="johndoe@email.com"
          label="Email"
          name="email"
          type="email"
          icon="Mail"
        />
        <CustomFormField
          control={form.control}
          placeholder="+1234567890"
          label="Phone number"
          name="phone"
          type="tel"
          icon="Phone"
        />
        <Button type="submit" className="w-full bg-green-500 text-white">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default PatientForm;
