import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[]> | null;
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors || !errors[id]) {
    return null;
  }

  return (
    <div
      id={`${id}-errors`}
      aria-live="polite"
      className="text-red-500 text-xs mt-2"
    >
      {errors?.[id]?.map((error, index) => (
        <div
          key={index}
          className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
        >
          <XCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};
