import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import StreamMessage from "components/stream-message";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { Stream } from ".prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "libs/client/useMutation";
import DeleteButton from "components/delete-button";
import useMe from "libs/client/useMe";
import RecordedVideoItem from "components/items/recorded-video-item";
import FloatingButton from "components/floating-button";
import { RiVideoAddFill } from "react-icons/ri";

interface StreamDetailFormData {
  text: string;
}

interface RecordedVideo {
  uid: string;
  meta: { name: string };
  preview: string;
  liveInput: string;
  thumbnail: string;
  thumbnailTimestampPct: number;
  allowedOrigins: any[];
  size: number;
  input: { width: number; height: number };
  playback: { hls: string; dash: string };
  status: { state: string; pctComplete: string; errorReasonCode: string; errorReasonText: string };
  creator: any;
  duration: number;
  maxDurationSeconds: any;
  maxSizeBytes: any;
  modified: string;
  readyToStream: boolean;
  requireSignedURLs: boolean;
  uploadExpiry: any;
  watermark: any;
  created: string;
  uploaded: string;
}

interface RecordedVideos {
  success: boolean;
  errors: any[];
  messages: any[];
  result: RecordedVideo[];
}

interface StreamMessages {
  id: number;
  text: string;
  user: { id: number; username: string; cloudflareImageId: string | null };
}

interface StreamWithStreamMessages extends Stream {
  streamMessages: StreamMessages[];
}

interface StreamDetailResult extends CommonResult {
  stream?: StreamWithStreamMessages;
  recordedVideos?: RecordedVideos;
}

interface ViewsResult {
  liveViewers: number;
}

interface LifecycleResult {
  isInput: boolean;
  live: boolean;
  status: string;
  videoUID: string | null;
}

const StreamDetail: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const [showStreamInfo, setShowStreamInfo] = useState(false);
  const [streamMessageAddMutation, { loading: streamMessageAddLoading }] = useMutation<CommonResult>(`/api/streams/${router.query.id}/message`);
  const [streamDeleteMutation, { data: streamDeleteData, loading: streamDeleteLoading }] = useMutation<CommonResult>(`/api/streams/${router.query.id}/delete`);
  const { register, handleSubmit, getValues, reset } = useForm<StreamDetailFormData>({ defaultValues: { text: "" } });
  const { data, mutate } = useSWR<StreamDetailResult>(router.query.id ? `/api/streams/${router.query.id}` : null, {
    refreshInterval: 1000,
  });
  const { data: viewsData } = useSWR<ViewsResult>(data?.stream?.cloudflareStreamId ? `https://videodelivery.net/${data?.stream?.cloudflareStreamId}/views` : null, {
    refreshInterval: 1000,
  });
  const { data: lifecycleData } = useSWR<LifecycleResult>(data?.stream?.cloudflareStreamId ? `https://videodelivery.net/${data?.stream?.cloudflareStreamId}/lifecycle` : null, {
    refreshInterval: 1000,
  });

  const onValid = async () => {
    if (streamMessageAddLoading === true) {
      return;
    }
    const { text } = getValues();
    const newMessage = { id: Date.now(), text, user: { id: me?.id as number, username: me?.username as string, cloudflareImageId: me?.cloudflareImageId as string } };
    reset();
    await streamMessageAddMutation({ text });
    mutate((prev) => prev && prev.stream && { ...prev, stream: { ...prev.stream, streamMessages: [...prev.stream?.streamMessages, newMessage] } }, true);
  };

  const handleDeleteStream = async () => {
    if (streamDeleteLoading === true) {
      return;
    }
    await streamDeleteMutation();
  };

  const handleToggleStreamInfo = () => {
    setShowStreamInfo((showStreamInfo) => !showStreamInfo);
  };

  useEffect(() => {
    if (streamDeleteData?.ok === true) {
      router.push("/streams");
    }
  }, [streamDeleteData, router]);

  useEffect(() => {
    if (data?.ok === false) {
      router.push("/streams");
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle={data?.stream?.title} hasFooter={false}>
      <div className="wrapper">
        <div className="max-w-[700px] mx-auto h-full pt-8 pb-8">
          <div>
            <div className="w-full rounded-lg aspect-video border">
              {data?.stream?.cloudflareStreamId ? (
                <iframe
                  src={`https://iframe.videodelivery.net/${data?.stream?.cloudflareStreamId}`}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen={true}
                  className="w-full h-full rounded-lg"
                ></iframe>
              ) : (
                <div className="w-full h-full rounded-lg bg-gray-50"></div>
              )}
            </div>
            <div className="mt-3 mb-5 relative">
              <h1 className="text-xl">
                {lifecycleData?.live === true && "[생] "}
                {data?.stream?.title}
              </h1>
              {lifecycleData?.live === false ? <p className="text-base text-gray-800 mt-1.5">{data?.stream?.description}</p> : null}
              {lifecycleData?.live === true ? <p className="text-[14px] text-gray-600 mt-1.5">현재 {viewsData?.liveViewers}명 시청 중</p> : null}
              {data?.stream?.userId === me?.id ? (
                <div className="absolute top-0 right-0 w-full">
                  <DeleteButton onClick={handleDeleteStream} text="스트림 삭제" />
                  <button
                    onClick={handleToggleStreamInfo}
                    type="button"
                    className="absolute top-9 right-0 rounded-md text-xs cursor-pointer px-2 py-1.5 border text-gray-400 hover:bg-gray-50"
                  >
                    스트림 정보
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* 스트림 정보 보기 */}
          {showStreamInfo === true ? (
            <div className="px-5 py-5 mb-2 bg-gray-100 rounded-md flex flex-col space-y-4">
              <div>
                <p className="font-semibold text-[14px]">서버 URL</p>
                <span className="text-[14px]">{data?.stream?.cloudflareStreamUrl}</span>
              </div>
              <div>
                <p className="font-semibold text-[14px]">스트림 키</p>
                <span className="text-[14px]">{data?.stream?.cloudflareStreamKey}</span>
              </div>
            </div>
          ) : null}

          <div className="border border-gray-100 rounded-lg">
            <div className="px-3 pt-4 relative h-[40vh] bg-neutral-50 overflow-auto scrollbar-hide">
              {data?.stream?.streamMessages.map((streamMessage) => (
                <StreamMessage
                  key={streamMessage.id}
                  username={streamMessage.user.username}
                  cloudflareImageId={streamMessage.user.cloudflareImageId}
                  text={streamMessage.text}
                  isMe={streamMessage.user.id === me?.id}
                />
              ))}
            </div>
            <form onSubmit={handleSubmit(onValid)} className="w-full px-1 py-1 border-t">
              <div className="relative w-full px-2 py-2 rounded-md outline-none bg-white">
                <input
                  {...register("text", { required: true, maxLength: 80 })}
                  maxLength={80}
                  placeholder={me === undefined ? "로그인 후 이용가능합니다." : "메세지를 입력해주세요."}
                  className="text-[15px] outline-none w-full placeholder:text-gray-300"
                />
                <button
                  disabled={me === undefined}
                  type="submit"
                  className="absolute right-0.5 bottom-1 flex items-end px-4 py-1.5 rounded-md bg-orange-400 hover:bg-orange-500 text-sm text-white"
                >
                  전송
                </button>
              </div>
            </form>
          </div>

          {/* 최근 방송 */}
          <div className="mt-12">
            <h2 className="mb-3 font-medium">최근 방송</h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-14">
              {data?.recordedVideos?.result.map((recordedVideo: any) => (
                <RecordedVideoItem
                  key={recordedVideo.uid}
                  preview={recordedVideo.preview}
                  meta={recordedVideo.meta}
                  duration={recordedVideo.duration}
                  created={recordedVideo.created}
                />
              ))}
            </div>
          </div>
        </div>
        <FloatingButton href={me ? "/streams/create" : "/login"}>
          <RiVideoAddFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default StreamDetail;
