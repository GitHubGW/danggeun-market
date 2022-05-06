import { NextPage } from "next";
import Link from "next/link";
import Avatar from "components/avatar";
import ProductItem from "components/items/product-item";
import Region from "components/region";
import Username from "components/username";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Button from "components/button";
import Separator from "components/separator";
import MainLayout from "components/layouts/main-layout";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { Product } from ".prisma/client";
import { CommonResult } from "libs/server/withHandler";
import CreatedAt from "components/created-at";
import useMutation from "libs/client/useMutation";
import { useEffect } from "react";
import DetailImage from "components/detail-image";
import DeleteButton from "components/delete-button";
import useMe from "libs/client/useMe";

interface ProductWithUserAndCount extends Product {
  user: { id: number; username: string; avatarUrl: string | null; address: string | null };
  _count: { productLikes: number };
}

interface SimilarProductWithCount extends Product {
  user: { id: number; username: string; avatarUrl: string | null; address: string | null };
  _count: { productLikes: number };
}

interface ProductDetailResult extends CommonResult {
  product?: ProductWithUserAndCount;
  similarProducts?: SimilarProductWithCount[];
  isLiked: boolean;
}

const ProductDetail: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const { data, mutate } = useSWR<ProductDetailResult>(router.query.id && `/api/products/${router.query.id}`);
  const [productLikeMutation] = useMutation<CommonResult>(`/api/products/${router.query.id}/like`);
  const [productDeleteMutation, { data: productDeleteData, loading: productDeleteLoading }] = useMutation<CommonResult>(`/api/products/${router.query.id}/delete`);

  const handleToggleProductLike = async () => {
    if (data === undefined) {
      return;
    }
    mutate(
      (prev: ProductDetailResult | undefined) =>
        prev &&
        prev.product && {
          ...prev,
          isLiked: !prev.isLiked,
          product: { ...prev.product, _count: { productLikes: prev.isLiked === true ? prev.product?._count.productLikes - 1 : prev.product?._count.productLikes + 1 } },
        },
      false
    );
    productLikeMutation();
  };

  const handleDeleteProduct = async () => {
    if (productDeleteLoading === true) {
      return;
    }
    await productDeleteMutation();
  };

  useEffect(() => {
    if (productDeleteData?.ok === true) {
      router.push("/products");
    }
  }, [productDeleteData, router]);

  useEffect(() => {
    if (data?.ok === false) {
      router.push("/products");
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle={data?.product?.name} hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          {/* 상품 상세 정보 */}
          <div>
            <div className="cursor-pointer">
              <DetailImage imageUrl={data?.product?.imageUrl} />
            </div>
            <div className="border-b pt-6 pb-5 flex items-center relative">
              <div>
                <Link href={`/users/${data?.product?.user?.username}/posts`}>
                  <a>
                    <Avatar avatarUrl={data?.product?.user?.avatarUrl} size="w-10" />
                  </a>
                </Link>
              </div>
              <div className="flex flex-col ml-2">
                <Link href={`/users/${data?.product?.user?.username}/posts`}>
                  <a>
                    <Username text={data?.product?.user?.username} size="text-[15px]" textDecoration={true} />
                  </a>
                </Link>
                <Region text={data?.product?.user.address} size="text-[13px]" />
              </div>
              {data?.product?.userId === me?.id ? <DeleteButton onClick={handleDeleteProduct} text="게시글 삭제" /> : null}
            </div>
            <div className="py-8">
              <h1 className="text-xl font-semibold">{data?.product?.name}</h1>
              <p className="text-xs text-gray-400 mt-2 mb-1.5 space-x-1">
                <span>게임/취미</span>
                <Separator />
                <CreatedAt size="" date={data?.product?.createdAt} />
              </p>
              <p className="font-bold text-[18px]">{data?.product?.price}원</p>
              <p className="font-normal my-5 leading-7 text-[17px]">{data?.product?.description}</p>
              <p className="text-xs text-gray-400 space-x-1">
                <span>관심 {data?.product?._count.productLikes}</span>
              </p>
            </div>
            <div className="flex items-center justify-between py-4 border-t border-b">
              <Button loading={false} type="button" text="채팅으로 거래하기" size="w-full" />
              {data?.isLiked === true ? (
                <AiFillHeart onClick={handleToggleProductLike} className="text-red-500 text-[44px] p-2 ml-2 cursor-pointer rounded-full hover:bg-gray-100" />
              ) : (
                <AiOutlineHeart onClick={handleToggleProductLike} className="text-gray-300 text-[44px] p-2 ml-2 cursor-pointer rounded-full hover:bg-gray-100" />
              )}
            </div>
          </div>

          {/* 관련 상품들 */}
          <div>
            <div className="my-8 flex justify-between">
              <h3 className="text-lg font-semibold">관련 상품들</h3>
              <Link href="/products">
                <a className="text-orange-400 hover:text-orange-500 text-[15px]">더 구경하기</a>
              </Link>
            </div>
            <section>
              <div>
                <div className="content">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-12">
                    {data?.similarProducts?.map((similarProduct) => (
                      <ProductItem key={similarProduct.id} {...similarProduct} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
