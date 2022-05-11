import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import StreamMessage from "components/stream-message";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { Stream } from ".prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "libs/client/useMutation";
import DeleteButton from "components/delete-button";
import useMe from "libs/client/useMe";

interface StreamDetailFormData {
  text: string;
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
}

const StreamDetail: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const { data, mutate } = useSWR<StreamDetailResult>(router.query.id ? `/api/streams/${router.query.id}` : null, {
    refreshInterval: 1000,
  });
  const [streamMessageAddMutation, { data: streamMessageAddData, loading: streamMessageAddLoading }] = useMutation<CommonResult>(`/api/streams/${router.query.id}/message`);
  const [streamDeleteMutation, { data: streamDeleteData, loading: streamDeleteLoading }] = useMutation<CommonResult>(`/api/streams/${router.query.id}/delete`);
  const { register, handleSubmit, getValues, reset } = useForm<StreamDetailFormData>({ defaultValues: { text: "" } });

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
            <div className="w-full rounded-lg bg-slate-200 h-[470px]"></div>
            <div className="mt-4 mb-4 relative">
              <h1 className="text-lg font-medium">{data?.stream?.title}</h1>
              <p className="text-[15px] text-gray-400 mt-0.5">{data?.stream?.description}</p>
              {data?.stream?.userId === me?.id ? (
                <div className="absolute right-0 top-2 w-full">
                  <DeleteButton onClick={handleDeleteStream} text="스트리밍 삭제" />
                </div>
              ) : null}
            </div>
          </div>
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
                  placeholder="메세지를 입력해주세요."
                  className="text-[15px] outline-none w-full placeholder:text-gray-300"
                />
                <button type="submit" className="absolute right-0.5 bottom-1 flex items-end px-4 py-1.5 rounded-md bg-orange-400 hover:bg-orange-500 text-sm text-white">
                  전송
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StreamDetail;
