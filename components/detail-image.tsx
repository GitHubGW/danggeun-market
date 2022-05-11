import Image from "next/image";
import backgroundRow from "public/images/background_row.png";

interface DetailImageProps {
  cloudflareImageId?: string | null;
}

const DetailImage = ({ cloudflareImageId }: DetailImageProps) => {
  return (
    <div className="relative w-full h-[500px] border rounded-xl">
      <Image
        layout="fill"
        objectFit="cover"
        src={cloudflareImageId ? `https://imagedelivery.net/mrfqMz0r88w_Qqln2FwPhQ/${cloudflareImageId}/public` : backgroundRow}
        alt=""
        className="border border-gray-100 rounded-xl"
      />
    </div>
  );
};

export default DetailImage;
