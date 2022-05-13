import { Post, Prisma, Product, User } from "@prisma/client";
import PostItem from "components/items/post-item";
import ProductItem from "components/items/product-item";
import MainLayout from "components/layouts/main-layout";
import { CommonResult } from "libs/server/withHandler";
import { NextPage } from "next";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";
import background404 from "public/images/background_404.png";

interface ProductWithUserAndCount extends Product {
  user: User;
  _count: Prisma.ProductCountOutputType;
}

interface PostWithUserAndCount extends Post {
  user: User;
  _count: Prisma.PostCountOutputType;
}

interface SearchResult extends CommonResult {
  products?: ProductWithUserAndCount[];
  posts?: PostWithUserAndCount[];
}

const Search: NextPage = () => {
  const router: NextRouter = useRouter();
  const { data } = useSWR<SearchResult>(router.query.keyword ? `/api/search?keyword=${router.query.keyword}` : null);

  return (
    <MainLayout pageTitle={`${router.query.keyword} 검색결과`} hasFooter={true}>
      <div className={data?.products?.length === 0 && data.posts?.length === 0 ? "without-header-footer" : ""}>
        <section>
          {data?.products?.length === 0 && data.posts?.length === 0 ? (
            <div className="without-header-footer">
              <div className="h-full flex justify-center items-center flex-col">
                <div className="mb-4">
                  <Image width={250} height={250} src={background404} alt="" />
                </div>
                <h2 className="text-2xl font-semibold">앗! {router.query.keyword} 검색 결과가 없습니다.</h2>
                <p className="text-xl text-center mt-3">다른 키워드로 검색해보세요.</p>
              </div>
            </div>
          ) : null}

          {data?.products?.length !== 0 ? (
            <div>
              <div className="content-post py-20 mt-12">
                <h2 className="font-medium text-2xl leading-tight text-center">중고거래 인기매물</h2>
                <div className="grid grid-cols-4 mt-10 gap-x-7 gap-y-10">
                  {data?.products?.map((product) => (
                    <ProductItem
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      cloudflareImageId={product.cloudflareImageId}
                      user={product.user}
                      _count={product._count}
                      isSelling={product.isSelling}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {data?.posts?.length !== 0 ? (
            <div className="content-post">
              <div className="border rounded-lg bg-white px-8 py-4">
                <h1 className="text-lg font-medium">동네생활</h1>
                {data?.posts?.map((post) => (
                  <PostItem key={post.id} id={post.id} text={post.text} createdAt={post.createdAt} user={post.user} _count={post._count} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </MainLayout>
  );
};

export default Search;
