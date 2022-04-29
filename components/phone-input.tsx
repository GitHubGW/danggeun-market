import type { UseFormRegisterReturn } from "react-hook-form";

interface PhoneInputProps {
  register: UseFormRegisterReturn;
  required: boolean;
}

const PhoneInput = ({ register, required }: PhoneInputProps) => {
  return <input {...register} type="number" placeholder="휴대폰 번호를 입력해주세요." required={required} maxLength={15} className="input-space pl-12 pr-2 ring-normal" />;
};

export default PhoneInput;
