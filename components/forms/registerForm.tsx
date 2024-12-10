"use client";

import CustomFormField from "@/components/forms/CustomformField";
import SubmitButton from "@/components/submitButton";
import { Form, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { createUser } from "@/lib/actions/patient.action";
import { Doctors, formFieldType, GenderOptions } from "@/lib/constants";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function RegisterForm({ user }: { user: User }) {
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
    console.log("start submit...");
    setLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about your self.</p>
        </section>
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
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
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            placeholder="yourname@email.com"
            label="Date of Birth"
            name="birthDay"
            fieldType={formFieldType.DATE_PICKER}
          />
          <CustomFormField
            control={form.control}
            label="Gander"
            name="gander"
            fieldType={formFieldType.SKELETON}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className=" flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <label htmlFor={option} className="cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            placeholder="ex: 123 Main St"
            label="Address"
            name="address"
            fieldType={formFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            placeholder="software developer"
            label="Occupation"
            name="occupation"
            fieldType={formFieldType.INPUT}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            placeholder="Guardian name"
            label="Emergency Contact name"
            name="emergencyContactName"
            fieldType={formFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            placeholder="(123) 456-7890"
            label="Emergency Contact phone"
            name="emergencyContactPhone"
            fieldType={formFieldType.PHONE_INPUT}
          />
        </div>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          placeholder="Select a physician"
          label="Primary care physician"
          name="primaryCarePhysician"
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            placeholder="ex:BlueCross"
            label="Insurance Provider"
            name="insuranceProvider"
            fieldType={formFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            placeholder="ex:Ab123456"
            label="Insurance Policy Number"
            name="insurancePolicyNumber"
            fieldType={formFieldType.INPUT}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            placeholder="ex:Peanuts Penicillin, Pollen"
            label="Allergies (if any)"
            name="allergies"
            fieldType={formFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            placeholder="ex:ibuprofen 200mg, Levothyroxine 50mg, etc."
            label="Current Medications"
            name="currentMedications"
            fieldType={formFieldType.TEXTAREA}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            placeholder="ex:Mother has one million dollar"
            label="Family medical history (if relevant)"
            name="familyMedicalHistory"
            fieldType={formFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            placeholder="ex: Asthma, Hypothyroidism, etc."
            label="Past Medical History"
            name="pastMedicalHistory"
            fieldType={formFieldType.TEXTAREA}
          />
        </div>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
