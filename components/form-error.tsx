interface FormErrorProps {
  text: string;
}

const FormError = ({ text }: FormErrorProps) => {
  return <p className="text-xs text-red-400 ml-0.5 font-medium">{text}</p>;
};

export default FormError;
