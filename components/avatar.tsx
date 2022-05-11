import Image from "next/image";
import basicUser from "public/images/basic_user.png";

interface AvatarProps {
  cloudflareImageId?: string | null;
  size: string;
  style?: any;
}

const Avatar = ({ cloudflareImageId, size, style }: AvatarProps) => {
  return (
    <div className={`${size} relative`}>
      <Image
        layout="fill"
        src={cloudflareImageId ? `https://imagedelivery.net/mrfqMz0r88w_Qqln2FwPhQ/${cloudflareImageId}/avatar` : basicUser}
        alt=""
        className={`${style} aspect-square rounded-full cursor-pointer border border-gray-200`}
      />
    </div>
  );
};

export default Avatar;
