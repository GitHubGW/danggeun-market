import Link from "next/link";

interface StreamItemProps {
  id: number;
  title: string;
}

const StreamItem = ({ id, title }: StreamItemProps) => {
  return (
    <Link href={`/streams/${id}`}>
      <a>
        <div className="h-[185px] aspect-video rounded-lg bg-slate-200"></div>
        <div className="mt-1.5">
          <h1 className="text-base font-medium">{title}</h1>
        </div>
      </a>
    </Link>
  );
};

export default StreamItem;
