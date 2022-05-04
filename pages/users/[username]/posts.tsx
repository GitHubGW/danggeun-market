import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";
import { CommonResult } from "libs/server/withHandler";
import { Post, Prisma, User } from ".prisma/client";
import PostItem from "components/items/post-item";

interface PostWithUserAndCount extends Post {
  user: User;
  _count: Prisma.PostCountOutputType;
}

interface UserPostsResult extends CommonResult {
  posts?: PostWithUserAndCount[];
}

const UserPosts: NextPage = () => {
  const router: NextRouter = useRouter();
  const { data } = useSWR<UserPostsResult>(router.query.username ? `/api/users/${router.query.username}/posts` : null);

  return (
    <MainLayout pageTitle="동네생활 게시글" hasFooter={true}>
      <UserLayout>
        <div className="w-[700px] max-w-[700px]">
          <div>
            {data?.posts?.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
          </div>
        </div>
      </UserLayout>
    </MainLayout>
  );
};

export default UserPosts;
