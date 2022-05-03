import { NextPage } from "next";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import CreatedAt from "components/created-at";
import FloatingButton from "components/floating-button";
import MainLayout from "components/layouts/main-layout";
import Region from "components/region";
import Separator from "components/separator";
import Username from "components/username";
import useSWR from "swr";
import { CommonResult } from "libs/server/withHandler";
import { Post } from ".prisma/client";

interface PostsWithUserAndCount extends Post {
  user: { id: number; username: string; avatarUrl: string | null };
  _count: { postComments: number; postLikes: number };
}

interface PostsResult extends CommonResult {
  posts?: PostsWithUserAndCount[] | undefined;
}

const Posts: NextPage = () => {
  const { data } = useSWR<PostsResult>("/api/posts");

  console.log("data", data);

  return (
    <MainLayout pageTitle="동네생활" hasFooter={true}>
      <div className="wrapper bg-[#F8F9FA] relative">
        <div className="content-post">
          <div className="border rounded-lg bg-white px-8 py-4">
            <h1 className="text-lg font-medium">동네생활</h1>
            {data?.posts?.map((post) => (
              <div key={post.id} className="py-6 border-b border-gray-200 last-of-type:border-none">
                <Link href={`/posts/${post.id}`}>
                  <a>
                    <h2 className="cursor-pointer">{post.text.length > 80 ? `${post.text.slice(0, 80)}...` : post.text}</h2>
                  </a>
                </Link>
                <div className="flex justify-between mt-1">
                  <div className="space-x-[1px]">
                    <Link href={`/users/${post.user.username}/posts`}>
                      <a>
                        <Username text={post.user.username} size="text-[14px]" textDecoration={true} />
                      </a>
                    </Link>
                    <Separator />
                    <Region text="서울 강남구" size="text-[14px]" />
                    <Separator />
                    <CreatedAt date={post.createdAt} size="text-[14px]" />
                  </div>
                  <div className="flex">
                    <Link href={`/posts/${post.id}`}>
                      <a className="flex space-x-2">
                        <div className="flex items-center">
                          <FaRegComment className="text-gray-400 mr-1" />
                          <span className="text-sm">{post._count.postComments}</span>
                        </div>
                        <div className="flex items-center">
                          <AiOutlineHeart className="text-red-400 mr-0.5" />
                          <span className="text-sm">{post._count.postLikes}</span>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <span className="text-center block text-gray-600 mt-6 cursor-pointer">더보기</span>
          </div>
        </div>
        <FloatingButton href="/posts/write">
          <RiPencilFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default Posts;
