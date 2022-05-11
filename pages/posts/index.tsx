import { NextPage } from "next";
import { RiPencilFill } from "react-icons/ri";
import FloatingButton from "components/floating-button";
import MainLayout from "components/layouts/main-layout";
import { Post } from ".prisma/client";
import PostItem from "components/items/post-item";
import useSWRInfiniteClick from "libs/client/useSWRInfiniteClick";
import { MutableRefObject, useRef } from "react";

interface PostWithUserAndCount extends Post {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  _count: { postComments: number; postLikes: number };
}

const Posts: NextPage = () => {
  const moreRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const infiniteData = useSWRInfiniteClick<PostWithUserAndCount>(`/api/posts`, moreRef);

  return (
    <MainLayout pageTitle="동네생활" hasFooter={true}>
      <div className="wrapper bg-[#F8F9FA] relative">
        <div className="content-post">
          <div className="border rounded-lg bg-white px-8 py-4">
            <h1 className="text-lg font-medium">동네생활</h1>
            {infiniteData?.map((post) => (
              <PostItem key={post.id} id={post.id} text={post.text} createdAt={post.createdAt} user={post.user} _count={post._count} />
            ))}
            <span ref={moreRef} className="text-center block text-gray-600 mt-6 cursor-pointer">
              더보기
            </span>
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
