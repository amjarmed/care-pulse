"use client";
import LucIcon from "@/components/LucideIcon";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { icons } from "lucide-react";
import { HTMLInputTypeAttribute } from "react";
import { Control } from "react-hook-form";

interface CustomFormFieldProps {
  control: Control<any>;
  placeholder: string;
  formDescription?: string;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute | undefined;
  icon: keyof typeof icons;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: "";
  children?: React.ReactNode;
  renderSkelton?: (field: any) => React.ReactNode;
}

function CustomFormField({
  control,
  placeholder,
  label,
  name,
  type,
  icon,
}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {type !== "checkbox" && label && <FormLabel>{label}</FormLabel>}

          <section className="relative">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                className="ps-12 py-6 focus:border-green-300 focus:shadow focus:shadow-green-400 transition"
              />
            </FormControl>
            <LucIcon
              size={24}
              name={icon}
              styles="absolute top-1/2 left-16 -translate-x-14 -translate-y-1/2"
            />
          </section>

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
