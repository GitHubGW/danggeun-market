import useMe from "libs/client/useMe";
import prisma from "libs/server/prisma";
import MainLayout from "components/layouts/main-layout";
import StreamItem from "components/items/stream-item";
import FloatingButton from "components/floating-button";
import { Stream } from ".prisma/client";
import { RiVideoAddFill } from "react-icons/ri";
import { GetStaticProps, NextPage } from "next";
import { CommonResult } from "libs/server/withHandler";

interface StreamWithUser extends Stream {
  user: { id: number; username: string; cloudflareImageId: string | null };
}

interface StreamsResult extends CommonResult {
  streams?: StreamWithUser[];
}

const Streams: NextPage<StreamsResult> = ({ streams }) => {
  const me = useMe();

  return (
    <MainLayout pageTitle="스트리밍" hasFooter={true}>
      <div className="wrapper relative without-header-footer">
        <div className="content pt-8">
          <div className="grid grid-cols-3 gap-x-4 gap-y-20">
            {streams?.map((stream) => (
              <StreamItem key={stream.id} id={stream.id} title={stream.title} user={stream.user} cloudflareStreamId={stream.cloudflareStreamId} />
            ))}
          </div>
        </div>
        <FloatingButton href={me ? "/streams/create" : "/login"}>
          <RiVideoAddFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const foundStreams = await prisma?.stream.findMany({
    include: { user: { select: { id: true, username: true, cloudflareImageId: true } } },
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      ok: true,
      message: "전체 스트리밍 보기에 성공하였습니다.",
      streams: JSON.parse(JSON.stringify(foundStreams)),
    },
  };
};

export default Streams;
