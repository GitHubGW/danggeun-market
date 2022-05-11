import Image from "next/image";
import basicUser from "public/images/basic_user.png";

interface MessageProps {
  isMe: boolean;
  cloudflareImageId?: string;
  createdAt: string;
  text: string;
}

const Message = ({ isMe, cloudflareImageId, text, createdAt }: MessageProps) => {
  console.log("cloudflareImageId", cloudflareImageId);

  return (
    <>
      {isMe === true ? (
        <div className="flex flex-row-reverse items-end mb-4">
          <div className="text-sm bg-orange-500 text-white rounded-2xl rounded-tr-none py-2.5 px-3.5">
            <p>{text}</p>
          </div>
          <time className="text-xs text-gray-400 mr-1">{createdAt}</time>
        </div>
      ) : (
        <div className="flex mb-4">
          <div className="">
            <Image
              width={32}
              height={32}
              src={cloudflareImageId ? `https://imagedelivery.net/mrfqMz0r88w_Qqln2FwPhQ/${cloudflareImageId}/avatar` : basicUser}
              alt=""
              className="border rounded-full"
            />
          </div>
          <div className="text-sm bg-gray-200 rounded-3xl rounded-tl-none ml-2 py-2.5 px-3.5">
            <p>{text}</p>
          </div>
          <div className="flex items-end">
            <time className="text-xs text-gray-400 ml-1">{createdAt}</time>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
