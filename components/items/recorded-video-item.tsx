import CreatedAt from "components/created-at";
import Separator from "components/separator";

interface RecordedVideoItemProps {
  preview: string;
  meta: { name: string };
  duration: number;
  created: string;
}

const RecordedVideoItem = ({ preview, meta, duration, created }: RecordedVideoItemProps) => {
  return (
    <div className="w-full rounded-lg aspect-video">
      <iframe
        src={preview}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
        className="w-full h-full rounded-lg shadow-lg"
      ></iframe>
      <div>
        <h2 className="text-base font-medium mt-2">{meta?.name}</h2>
        <div className="flex items-center">
          <p className="text-sm mr-0.5">{new Date(Math.ceil(duration) * 1000).toTimeString().substring(3, 8)}</p>
          <Separator />
          <CreatedAt date={created} size="text-[13px] ml-0.5" />
        </div>
      </div>
    </div>
  );
};

export default RecordedVideoItem;
