import { NextPage } from "next";
import { RiPencilFill } from "react-icons/ri";
import FloatingButton from "components/floating-button";
import MainLayout from "components/layouts/main-layout";
import useSWR from "swr";
import { CommonResult } from "libs/server/withHandler";
import { Post } from ".prisma/client";
import PostItem from "components/items/post-item";

interface PostWithUserAndCount extends Post {
  user: { id: number; username: string; avatarUrl: string | null; address: string | null };
  _count: { postComments: number; postLikes: number };
}

interface PostsResult extends CommonResult {
  posts?: PostWithUserAndCount[] | undefined;
}

const Posts: NextPage = () => {
  const { data } = useSWR<PostsResult>("/api/posts");

  return (
    <MainLayout pageTitle="동네생활" hasFooter={true}>
      <div className="wrapper bg-[#F8F9FA] relative">
        <div className="content-post">
          <div className="border rounded-lg bg-white px-8 py-4">
            <h1 className="text-lg font-medium">동네생활</h1>
            {data?.posts?.map((post) => (
              <PostItem key={post.id} {...post} />
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
