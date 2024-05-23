"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className={cn(
        "w-full py-2 text-white font-semibold rounded-md bg-sky-900 hover:bg-primary-600",
        className
      )}
      variant={variant}
    >
      {children}
    </Button>
  );
};
