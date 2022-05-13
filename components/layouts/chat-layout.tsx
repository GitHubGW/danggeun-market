import React from "react";
import Link from "next/link";
import Avatar from "components/avatar";
import Region from "components/region";
import Username from "components/username";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import useSWR from "swr";
import { Chat, ChatMessage, Prisma, User } from "@prisma/client";
import { CommonResult } from "libs/server/withHandler";
import useMe from "libs/client/useMe";

interface ChatLayoutProps {
  children: React.ReactNode;
}

interface ChatWithUserAndChatMessagesAndCount extends Chat {
  users: User[];
  chatMessages: ChatMessage[];
  _count: Prisma.ChatCountOutputType;
}

interface ChatsResult extends CommonResult {
  chats?: ChatWithUserAndChatMessagesAndCount[];
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const me = useMe();
  const { data } = useSWR<ChatsResult>(`/api/chats`);

  return (
    <div className="wrapper without-header">
      <div className="content">
        <div className="flex h-full">
          <div className="flex-1 border-l">
            <nav className="h-full">
              <div className="py-2 px-3 max-h-[60px] h-[60px]">
                <Link href="/chats">
                  <a className="flex items-center space-x-2.5">
                    <Avatar cloudflareImageId={me?.cloudflareImageId} size="w-11 h-11" />
                    <Username text={me?.username} size="text-base" textDecoration={false} />
                  </a>
                </Link>
              </div>
              <ul className="border-t border-b h-[calc(100%_-_120px)] overflow-auto">
                {data?.chats?.map((chat) => (
                  <li key={chat.id} className="border-b last-of-type:border-none py-3 px-3 hover:bg-gray-50">
                    <Link href={`/chats/${chat.id}`}>
                      <a className="flex items-center space-x-3">
                        {chat.users.map((user) => (
                          <React.Fragment key={user.id}>
                            {user.username !== me?.username ? (
                              <div key={user.id}>
                                <Avatar cloudflareImageId={user.cloudflareImageId} size="w-9 h-9" />
                              </div>
                            ) : null}
                          </React.Fragment>
                        ))}
                        <div>
                          {chat?.users?.map((user) => (
                            <React.Fragment key={user.id}>
                              {user.username !== me?.username ? (
                                <div key={user.id} className="space-x-1.5">
                                  <Username text={user.username} size="text-[14px]" textDecoration={false} />
                                  <Region text={user.address} size="text-[12px]" />
                                </div>
                              ) : null}
                            </React.Fragment>
                          ))}
                          {chat.chatMessages.slice(-1).map((chatMessage) => (
                            <div key={chatMessage.id} className="text-[12px]">
                              <span>{chatMessage.text}</span>
                            </div>
                          ))}
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="py-2.5 px-2 max-h-14 h-14">
                <div className="inline-flex items-center px-2 py-2 rounded-lg text-gray-400 text-sm hover:bg-gray-100 transition-all">
                  <a href="https://www.daangn.com/wv/faqs?kind=karrotchat" target="_blank" rel="noreferrer">
                    자주묻는 질문
                  </a>
                  <span className="ml-1">
                    <AiOutlineQuestionCircle />
                  </span>
                </div>
              </div>
            </nav>
          </div>
          <div className="min-w-[730px] max-w-[730px] border-l border-r">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
