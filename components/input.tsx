import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn;
  onKeyDown?: () => void;
  type: string;
  placeholder: string;
  required: boolean;
}

const Input = ({ register, onKeyDown, type, placeholder, required }: InputProps) => {
  return <input {...register} onKeyDown={onKeyDown} type={type} placeholder={placeholder} required={required} maxLength={30} className="input ring-normal" />;
};

export default Input;
