import Link from "next/link";

interface StreamItemProps {
  id: number;
  title: string;
  user: { id: number; username: string; avatarUrl: string | null };
}

const StreamItem = ({ id, title, user }: StreamItemProps) => {
  return (
    <Link href={`/streams/${id}`}>
      <a>
        <div className="h-[185px] aspect-video rounded-lg bg-slate-200"></div>
        <div className="mt-2 flex">
          <img src={user.avatarUrl || "/images/basic_user.png"} alt="" className="w-9 h-9 rounded-full mr-2" />
          <div>
            <h2 className="text-base font-medium">{title}</h2>
            <span className="text-sm text-gray-500">{user.username}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default StreamItem;
