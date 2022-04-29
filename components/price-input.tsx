import type { UseFormRegisterReturn } from "react-hook-form";

interface PriceInputProps {
  register: UseFormRegisterReturn;
  required: boolean;
}

const PriceInput = ({ register }: PriceInputProps) => {
  return <input {...register} type="number" placeholder="0" maxLength={15} className="input-space pl-7 pr-2 ring-normal" />;
};

export default PriceInput;
