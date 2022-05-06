import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import StreamItem from "components/items/stream-item";
import FloatingButton from "components/floating-button";
import { RiVideoAddFill } from "react-icons/ri";
import { CommonResult } from "libs/server/withHandler";
import { Stream } from ".prisma/client";
import useSWR from "swr";

interface StreamsResult extends CommonResult {
  streams?: Stream[];
}

const Streams: NextPage = () => {
  const { data } = useSWR<StreamsResult>(`/api/streams`);

  return (
    <MainLayout pageTitle="라이브" hasFooter={true}>
      <div className="wrapper relative">
        <div className="content mt-8 mb-16">
          <div className="grid grid-cols-3 gap-x-4 gap-y-20">
            {data?.streams?.map((stream) => (
              <StreamItem key={stream.id} {...stream} />
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
