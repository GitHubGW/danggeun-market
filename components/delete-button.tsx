import Loading from "./loading";

interface DeleteButtonProps {
  onClick: () => any;
  text: string;
  style?: string;
  loading?: boolean;
}

const DeleteButton = ({ onClick, text, style, loading }: DeleteButtonProps) => {
  return (
    <button onClick={onClick} type="button" className={`${style} absolute rounded-md h-[30px] right-0 text-xs cursor-pointer px-2 py-1.5 border text-gray-400 hover:bg-gray-50`}>
      <span className="flex items-center">{loading === true ? <Loading color="orange" size={12} /> : text}</span>
    </button>
  );
};

export default DeleteButton;
