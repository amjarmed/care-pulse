"use client";
import { E164Number } from "libphonenumber-js/core";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formFieldType } from "@/lib/constants";
import { SelectValue } from "@radix-ui/react-select";
import Image from "next/image";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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
  showTimeSelect?: boolean;
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
  const {
    fieldType,
    icon,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    children,
  } = props;

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
    case formFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
            rows={3}
          />
        </FormControl>
      );
    case formFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="ml-2 checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
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
              className="shad-input border-0 "
              {...field}
            />
          </FormControl>
        </div>
      );

    case formFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={placeholder}
              name={field}
              // field.value as E164Number | undefined
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="input-phone border-none outline-none"
              {...field}
              international
              withCountryCallingCode
            />
          </FormControl>
        </div>
      );

    case formFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            width={24}
            height={24}
            className="ml-2"
          />

          <FormControl>
            <DatePicker
              selected={field.value}
              name={field}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat && "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case formFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case formFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
        </FormControl>
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
              <FormLabel htmlFor={field.name}>{label}</FormLabel>
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
