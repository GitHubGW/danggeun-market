interface DetailImageProps {
  imageUrl?: string | null;
}

const DetailImage = ({ imageUrl }: DetailImageProps) => {
  return <img src={imageUrl || "/images/background_row.png"} alt="" className="border border-gray-100 rounded-xl w-full h-[500px]" />;
};

export default DetailImage;
