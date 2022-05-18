import React, { useEffect } from "react";
import Link from "next/link";
import Avatar from "components/avatar";
import ChatLayout from "components/layouts/chat-layout";
import MainLayout from "components/layouts/main-layout";
import Message from "components/message";
import Username from "components/username";
import useSWR from "swr";
import useMe from "libs/client/useMe";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { ChatMessage, User } from "@prisma/client";
import DeleteButton from "components/delete-button";
import useMutation from "libs/client/useMutation";
import { useForm } from "react-hook-form";
import Loading from "components/loading";

interface ChatDetailFormData {
  text: string;
}

interface ChatMessageWithUserAndChat extends ChatMessage {
  user: User;
}

interface ChatDetailResult extends CommonResult {
  chatMessages?: ChatMessageWithUserAndChat[];
}

const ChatDetail = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const { data, mutate } = useSWR<ChatDetailResult>(router.query.id ? `/api/chats/${router.query.id}` : null, {
    refreshInterval: 1000,
  });
  const [chatMessageAddMutation, { loading: chatMessageAddLoading }] = useMutation<CommonResult>(`/api/chats/${router.query.id}`);
  const [chatDeleteMutation, { data: chatDeleteData, loading: chatDeleteLoading }] = useMutation<CommonResult>(`/api/chats/${router.query.id}/delete`);
  const { register, handleSubmit, getValues, reset, watch } = useForm<ChatDetailFormData>({ defaultValues: { text: "" } });
  const opponent = data?.chatMessages?.find((chatMessage) => chatMessage.userId !== me?.id);

  const onValid = async () => {
    if (chatMessageAddLoading === true) {
      return;
    }
    const { text } = getValues();
    const newMessage = {
      id: Date.now(),
      text,
      userId: me?.id,
      chatId: router.query.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: me?.id as number,
        phone: me?.phone,
        email: me?.email,
        username: me?.username as string,
        cloudflareImageId: me?.cloudflareImageId as string,
        address: me?.address,
        chatId: router.query.id,
        createdAt: me?.createdAt,
        updatedAt: me?.updatedAt,
      },
    };
    reset();
    await chatMessageAddMutation({ text });
    mutate((prev) => prev && prev.chatMessages && ({ ...prev, chatMessages: [...prev.chatMessages, newMessage] } as any), false);
  };

  const handleDeleteChat = async () => {
    if (chatDeleteLoading === true) {
      return;
    }
    chatDeleteMutation();
  };

  useEffect(() => {
    if (chatDeleteData?.ok === true) {
      router.push("/chats");
    }
  }, [chatDeleteData, router]);

  return (
    <MainLayout pageTitle={`${opponent?.user.username ? `${opponent?.user.username}님과 채팅` : "채팅"}`} hasFooter={false}>
      <ChatLayout>
        <div className="h-full pb-3">
          <div className="h-[calc(100%_-_110px)] relative">
            {/* 채팅방 상단 */}
            <Link href={`/users/${opponent?.user.username}/posts`}>
              <a className="flex items-center space-x-3 px-3 border-b max-h-[61px] h-[61px]">
                <Avatar cloudflareImageId={opponent?.user.cloudflareImageId} size="w-9 h-9" />
                <Username text={opponent?.user.username} size="text-base" textDecoration={false} />
              </a>
            </Link>

            {/* 채팅방 나가기 버튼 */}
            <DeleteButton onClick={handleDeleteChat} text="채팅방 나가기" style="top-4 mr-3" />

            {/* 채팅방 메인 */}
            <div className="h-full pb-16">
              <div className="px-3 h-full overflow-auto pt-4">
                {data?.chatMessages?.map((chatMessage) => (
                  <Message
                    key={chatMessage.id}
                    isMe={chatMessage.userId === me?.id}
                    text={chatMessage.text}
                    createdAt={chatMessage.createdAt}
                    cloudflareImageId={chatMessage.user.cloudflareImageId || ""}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 채팅 메세지 전송 */}
          <form onSubmit={handleSubmit(onValid)} className="px-3">
            <div className="relative w-full border px-2.5 py-2 rounded-md outline-none h-[110px] max-h-28 bg-white">
              <textarea
                {...register("text", { required: "메세지를 입력해주세요." })}
                rows={2}
                maxLength={190}
                placeholder="메세지를 입력해주세요."
                className="resize-none text-[15px] outline-none w-full placeholder:text-gray-300"
              />
              <div className="absolute right-2 bottom-2 flex items-end">
                <div className="text-sm text-gray-300 mr-3 mb-1">
                  <span>{watch("text").length}</span>/190
                </div>
                <button type="submit" className="px-4 py-1.5 h-8 rounded-md bg-orange-400 hover:bg-orange-500 text-sm text-white">
                  {chatMessageAddLoading === true ? (
                    <div className="flex">
                      <Loading color="" size={13} />
                    </div>
                  ) : (
                    "전송"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </ChatLayout>
    </MainLayout>
  );
};

export default ChatDetail;
