import prisma from "libs/server/prisma";
import PostItem from "components/items/post-item";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import { CommonResult } from "libs/server/withHandler";
import { Post, PostLike, Product, ProductLike, User } from ".prisma/client";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";

interface ProductWithUserAndCount extends Product {
  user: { address: string | null };
  _count: { productLikes: number };
}

interface ProductLikeWithProduct extends ProductLike {
  product: ProductWithUserAndCount;
}

interface PostWithUserAndCount extends Post {
  user: { username: string; address: string | null };
  _count: { postComments: number; postLikes: number };
}

interface PostLikeWithPost extends PostLike {
  post: PostWithUserAndCount;
}

interface UserLikesResult extends CommonResult {
  productLikes?: ProductLikeWithProduct[];
  postLikes?: PostLikeWithPost[];
  user?: User;
}

const UserLikes: NextPage<UserLikesResult> = ({ productLikes, postLikes, user }) => {
  return (
    <MainLayout pageTitle="관심 목록" hasFooter={true}>
      <UserLayout user={user}>
        <div className="w-[700px] max-w-[700px]">
          {/* 관심 상품 */}
          <div>
            {Number(productLikes?.length) > 0 && <h2 className="font-medium text-lg mb-3">관심 상품 ({productLikes?.length})</h2>}
            <div className="grid grid-cols-3 gap-x-9 gap-y-12">
              {productLikes?.map((productLike) => (
                <ProductItem key={productLike.product.id} {...productLike.product} />
              ))}
            </div>
          </div>

          {/* 관심 게시글 */}
          <div className={`${Number(postLikes?.length) > 0 ? "mt-24" : ""}`}>
            {Number(postLikes?.length) > 0 && <h2 className="font-medium text-lg mb-1">관심 게시물 ({postLikes?.length})</h2>}
            <div>
              {postLikes?.map((postLike) => (
                <PostItem
                  key={postLike.post.id}
                  id={postLike.post.id}
                  text={postLike.post.text}
                  createdAt={postLike.post.createdAt}
                  user={postLike.post.user}
                  _count={postLike.post._count}
                />
              ))}
            </div>
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
  const foundProductLikes = await prisma?.productLike?.findMany({
    where: { user: { username: String(context.params?.username) } },
    include: {
      product: {
        include: {
          user: { select: { address: true } },
          _count: { select: { productLikes: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const foundPostLikes = await prisma?.postLike?.findMany({
    where: { user: { username: String(context.params?.username) } },
    include: {
      post: {
        include: {
          user: { select: { username: true, address: true } },
          _count: { select: { postComments: true, postLikes: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const foundUser = await prisma.user.findFirst({
    where: { username: String(context.params?.username) },
  });

  return {
    props: {
      ok: true,
      message: "사용자 관심 상품 및 관심 게시물 보기에 성공하였습니다.",
      productLikes: JSON.parse(JSON.stringify(foundProductLikes)),
      postLikes: JSON.parse(JSON.stringify(foundPostLikes)),
      user: JSON.parse(JSON.stringify(foundUser)),
    },
    revalidate: 10,
  };
};

export default UserLikes;
