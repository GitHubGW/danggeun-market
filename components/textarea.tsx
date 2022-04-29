import type { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps {
  register: UseFormRegisterReturn;
  rows: number;
  maxLength: number;
  placeholder: string;
}

const Textarea = ({ register, rows, maxLength, placeholder }: TextareaProps) => {
  return <textarea {...register} rows={rows} maxLength={maxLength} placeholder={placeholder} className="resize-none input ring-normal" />;
};

export default Textarea;
