import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import { Post, Prisma, User } from ".prisma/client";
import PostItem from "components/items/post-item";
import prisma from "libs/server/prisma";
import { CommonResult } from "libs/server/withHandler";

interface PostWithUserAndCount extends Post {
  user: User;
  _count: Prisma.PostCountOutputType;
}

interface UserPostsResult extends CommonResult {
  posts?: PostWithUserAndCount[];
  user?: User;
}

const UserPosts: NextPage<UserPostsResult> = ({ posts, user }) => {
  return (
    <MainLayout pageTitle="동네생활" hasFooter={true}>
      <UserLayout user={user}>
        <div className="w-[700px] max-w-[700px]">
          <div>
            {posts?.map((post) => (
              <PostItem key={post.id} id={post.id} text={post.text} createdAt={post.createdAt} user={post.user} _count={post._count} />
            ))}
          </div>
        </div>
      </UserLayout>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const foundPosts = await prisma.post.findMany({
    where: { user: { username: String(context.params?.username) } },
    include: { user: true, _count: true },
    orderBy: { createdAt: "desc" },
  });

  const foundUser = await prisma.user.findFirst({
    where: { username: String(context.params?.username) },
  });

  return {
    props: {
      ok: true,
      message: "사용자 동네 생활 게시글 보기에 성공하였습니다.",
      posts: JSON.parse(JSON.stringify(foundPosts)),
      user: JSON.parse(JSON.stringify(foundUser)),
    },
  };
};

export default UserPosts;
