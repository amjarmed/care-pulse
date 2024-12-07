"use client";
import { formFieldType } from "@/components/forms/patientForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { Control } from "react-hook-form";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  fieldType: formFieldType;
  placeholder?: string;
  label?: string;
  icon?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const { fieldType, icon, iconAlt, placeholder } = props;
  switch (props.fieldType) {
    case formFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {icon && (
            <Image
              src={icon}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              type={fieldType}
              placeholder={placeholder}
              name={field}
              className="shad-input border-0"
              {...field}
            />
          </FormControl>
        </div>
      );

    case formFieldType.EMAIL_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {icon && (
            <Image
              src={icon}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              type={fieldType}
              placeholder={placeholder}
              name={field}
              className="shad-input border-0"
              {...field}
            />
          </FormControl>
        </div>
      );

    case formFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {icon && (
            <Image
              src={icon}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              type={fieldType}
              placeholder={placeholder}
              name={field}
              className="shad-input border-0"
              {...field}
            />
          </FormControl>
        </div>
      );
    default:
      break;
  }
};
function CustomFormField(props: CustomFormFieldProps) {
  const { control, name, fieldType, label } = props;
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== formFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </>
  );
}

export default CustomFormField;
