import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import { NextRouter, useRouter } from "next/router";
import { Post, Prisma, User } from ".prisma/client";
import PostItem from "components/items/post-item";
import useSWRInfiniteScroll from "libs/client/useSWRInfiniteScroll";

interface PostWithUserAndCount extends Post {
  user: User;
  _count: Prisma.PostCountOutputType;
}

const UserPosts: NextPage = () => {
  const router: NextRouter = useRouter();
  const infiniteData = useSWRInfiniteScroll<PostWithUserAndCount>(router.query.username ? `/api/users/${router.query.username}/posts` : null);

  return (
    <MainLayout pageTitle="동네생활 게시글" hasFooter={true}>
      <UserLayout>
        <div className="w-[700px] max-w-[700px]">
          <div>
            {infiniteData?.map((post) => (
              <PostItem key={post.id} id={post.id} text={post.text} createdAt={post.createdAt} user={post.user} _count={post._count} />
            ))}
          </div>
        </div>
      </UserLayout>
    </MainLayout>
  );
};

export default UserPosts;
