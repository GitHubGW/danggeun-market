import Image from "next/image";
import Link from "next/link";
import basicUser from "public/images/basic_user.png";

interface StreamItemProps {
  id: number;
  title: string;
  user: { id: number; username: string; cloudflareImageId: string | null };
  cloudflareStreamId: string | null;
}

const StreamItem = ({ id, title, user, cloudflareStreamId }: StreamItemProps) => {
  return (
    <Link href={`/streams/${id}`}>
      <a>
        <div className="relative h-[185px] shadow-md rounded-lg transition-all hover:scale-[1.01]">
          {cloudflareStreamId ? (
            <Image
              priority
              layout="fill"
              src={`https://videodelivery.net/${cloudflareStreamId}/thumbnails/thumbnail.jpg?height=185`}
              alt=""
              className="h-[185px] aspect-video rounded-lg bg-slate-200 border-red"
            />
          ) : (
            <div className="h-[185px] aspect-video rounded-lg bg-slate-200 border-red"></div>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <div>
            <Image
              width={36}
              height={36}
              src={user.cloudflareImageId ? `https://imagedelivery.net/mrfqMz0r88w_Qqln2FwPhQ/${user.cloudflareImageId}/avatar` : basicUser}
              alt=""
              className="w-9 h-9 rounded-full"
            />
          </div>
          <div className="ml-2 flex flex-col">
            <h2 className="text-base font-medium">{title}</h2>
            <span className="text-sm text-gray-500">{user.username}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default StreamItem;
