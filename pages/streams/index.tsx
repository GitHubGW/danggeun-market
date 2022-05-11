import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import StreamItem from "components/items/stream-item";
import FloatingButton from "components/floating-button";
import { RiVideoAddFill } from "react-icons/ri";
import { Stream } from ".prisma/client";
import useSWRInfiniteScroll from "libs/client/useSWRInfiniteScroll";

interface StreamWithUser extends Stream {
  user: { id: number; username: string; cloudflareImageId: string | null };
}

const Streams: NextPage = () => {
  const infiniteData = useSWRInfiniteScroll<StreamWithUser>(`/api/streams`);

  return (
    <MainLayout pageTitle="라이브" hasFooter={true}>
      <div className="wrapper relative">
        <div className="content mt-8 mb-16">
          <div className="grid grid-cols-3 gap-x-4 gap-y-20">
            {infiniteData?.map((stream) => (
              <StreamItem key={stream.id} id={stream.id} title={stream.title} user={stream.user} />
            ))}
          </div>
        </div>
        <FloatingButton href="/streams/create">
          <RiVideoAddFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default Streams;
