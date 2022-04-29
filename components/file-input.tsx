import type { UseFormRegisterReturn } from "react-hook-form";

interface FileInputProps {
  register: UseFormRegisterReturn;
  required: boolean;
}

const FileInput = ({ register, required }: FileInputProps) => {
  return <input {...register} type="file" required={required} accept="image/*" className="hidden" />;
};

export default FileInput;
