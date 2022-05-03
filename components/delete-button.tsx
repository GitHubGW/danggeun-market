interface DeleteButtonProps {
  onClick: () => any;
  text: string;
}

const DeleteButton = ({ onClick, text }: DeleteButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="absolute rounded-md right-0 text-xs cursor-pointer px-2 py-1.5 border text-gray-400 hover:bg-gray-50">
      {text}
    </button>
  );
};

export default DeleteButton;
