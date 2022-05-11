import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { Post, PostLike, Product, ProductLike } from ".prisma/client";
import PostItem from "components/items/post-item";

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
}

const UserLikes: NextPage = () => {
  const router: NextRouter = useRouter();
  const { data } = useSWR<UserLikesResult>(router.query.username ? `/api/users/${router.query.username}/likes` : null);

  return (
    <MainLayout pageTitle="관심 목록" hasFooter={true}>
      <UserLayout>
        <div className="w-[700px] max-w-[700px]">
          {/* 관심 상품 */}
          <div>
            {Number(data?.productLikes?.length) > 0 && <h2 className="font-medium text-lg mb-3">관심 상품 ({data?.productLikes?.length})</h2>}
            <div className="grid grid-cols-3 gap-x-9 gap-y-12">
              {data?.productLikes?.map((productLike) => (
                <ProductItem key={productLike.product.id} {...productLike.product} />
              ))}
            </div>
          </div>

          {/* 관심 게시글 */}
          <div className={`${Number(data?.postLikes?.length) > 0 ? "mt-24" : ""}`}>
            {Number(data?.postLikes?.length) > 0 && <h2 className="font-medium text-lg mb-1">관심 게시물 ({data?.postLikes?.length})</h2>}
            <div className="">
              {data?.postLikes?.map((postLike) => (
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

export default UserLikes;
