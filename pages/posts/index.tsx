import useMe from "libs/client/useMe";
import Loading from "components/loading";
import PostItem from "components/items/post-item";
import FloatingButton from "components/floating-button";
import MainLayout from "components/layouts/main-layout";
import useSWRInfiniteClick from "libs/client/useSWRInfiniteClick";
import { NextPage } from "next";
import { Post } from ".prisma/client";
import { RiPencilFill } from "react-icons/ri";
import { MutableRefObject, useRef } from "react";

interface PostWithUserAndCount extends Post {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  _count: { postComments: number; postLikes: number };
}

const Posts: NextPage = () => {
  const me = useMe();
  const moreRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const infiniteData = useSWRInfiniteClick<PostWithUserAndCount>(`/api/posts`, moreRef);

  return (
    <MainLayout pageTitle="동네생활" hasFooter={true}>
      <div className="wrapper bg-[#F8F9FA] relative">
        <div className="content-post">
          <div className="border rounded-lg bg-white px-8 py-4">
            <h1 className="text-lg font-medium">동네생활</h1>
            {infiniteData.length !== 0 ? (
              <>
                {infiniteData?.map((post) => (
                  <PostItem key={post.id} id={post.id} text={post.text} createdAt={post.createdAt} user={post.user} _count={post._count} />
                ))}
              </>
            ) : (
              <div className="w-full h-[909px] flex justify-center">
                <div className="flex justify-center items-center flex-col">
                  <Loading color="orange" size={40} />
                </div>
              </div>
            )}
            <span ref={moreRef} className="text-center block text-gray-600 mt-6 cursor-pointer">
              더 보기
            </span>
          </div>
        </div>
        <FloatingButton href={me ? "/posts/write" : "/login"}>
          <RiPencilFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default Posts;
