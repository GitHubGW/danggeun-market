import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import basicUser from "public/images/basic_user.png";

interface StreamMessageProps {
  username: string;
  cloudflareImageId: string | null;
  text: string;
  isMe: boolean;
}

const StreamMessage = ({ username, cloudflareImageId, text, isMe }: StreamMessageProps) => {
  return (
    <div className="flex items-center mb-2">
      <Image
        width={34}
        height={34}
        src={cloudflareImageId ? `https://imagedelivery.net/mrfqMz0r88w_Qqln2FwPhQ/${cloudflareImageId}/avatar` : basicUser}
        alt=""
        className="w-[34px] h-[34px] border rounded-full"
      />
      <div className="text-[13px] text-gray-500 ml-1.5 mr-2 flex items-center">
        <span className="text-[10px] text-orange-500 mr-0.5">{isMe === true ? <FaCrown /> : null}</span>
        <span>{username}</span>
      </div>
      <div className="text-[14px] rounded-3xl">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default StreamMessage;
