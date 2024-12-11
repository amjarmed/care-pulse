"use client";
import FileUploader from "@/components/fileUploader";
import CustomFormField from "@/components/forms/CustomformField";
import SubmitButton from "@/components/submitButton";
import { Form, FormControl } from "@/components/ui/form";
import { registerPatient } from "@/lib/actions/patient.action";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  formFieldType,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/lib/constants";
import { PatientFormValidation } from "@/lib/validation";
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
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  //2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setLoading(true);
    console.log("start submitting...");
    console.log(values);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      // define the data the way that appwrite can understand
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      //@ts-ignore
      const newPatient = await registerPatient(patient);

      if (newPatient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
            name="birthDate"
            fieldType={formFieldType.DATE_PICKER}
          />
          <CustomFormField
            control={form.control}
            label="Gender"
            name="gender"
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
            name="emergencyContactNumber"
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
            name="currentMedication"
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

        <CustomFormField
          control={form.control}
          placeholder="Birth Certificate"
          label="Identification Type"
          name="identificationType"
          fieldType={formFieldType.SELECT}
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          placeholder="ex:123456"
          label="Identification Number"
          name="identificationNumber"
          fieldType={formFieldType.INPUT}
        />

        <CustomFormField
          control={form.control}
          label="Scan a copy of Identification Document"
          name="identificationDocument"
          fieldType={formFieldType.SKELETON}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          label="I consent to receive treatment for my health condition."
          name="treatmentConsent"
        />
        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          label="I consent to the use and disclosure of my health information for treatment purposes."
          name="disclosureConsent"
        />
        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          label="I acknowledge that i have reviewed and agree to the privacy policy."
          name="privacyConsent"
        />

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
