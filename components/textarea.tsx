import type { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps {
  register: UseFormRegisterReturn;
  rows: number;
  maxLength: number;
  placeholder: string;
  style?: string;
}

const Textarea = ({ register, rows, maxLength, placeholder, style }: TextareaProps) => {
  return <textarea {...register} required rows={rows} maxLength={maxLength} placeholder={placeholder} className={`${style} resize-none input ring-normal`} />;
};

export default Textarea;
