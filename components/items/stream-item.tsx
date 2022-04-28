import Link from "next/link";

interface StreamItemProps {
  title: string;
}

const StreamItem = ({ title }: StreamItemProps) => {
  return (
    <Link href="/streams/1">
      <a>
        <div className="h-[185px] aspect-video rounded-lg bg-slate-200"></div>
        <div className="mt-1.5">
          <h1 className="text-[15px] font-medium">{title}</h1>
        </div>
      </a>
    </Link>
  );
};

export default StreamItem;
