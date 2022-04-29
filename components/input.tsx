import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn;
  type: string;
  placeholder: string;
  required: boolean;
}

const Input = ({ register, type, placeholder, required }: InputProps) => {
  return <input {...register} type={type} placeholder={placeholder} required={required} maxLength={30} className="input ring-normal" />;
};

export default Input;
