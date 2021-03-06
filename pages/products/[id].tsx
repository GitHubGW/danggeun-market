import Link from "next/link";
import useMe from "libs/client/useMe";
import Avatar from "components/avatar";
import Region from "components/region";
import prisma from "libs/server/prisma";
import Loading from "components/loading";
import Username from "components/username";
import Separator from "components/separator";
import CreatedAt from "components/created-at";
import useMutation from "libs/client/useMutation";
import DetailImage from "components/detail-image";
import DeleteButton from "components/delete-button";
import FloatingButton from "components/floating-button";
import ProductItem from "components/items/product-item";
import MainLayout from "components/layouts/main-layout";
import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Product, Chat } from ".prisma/client";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBagPlusFill, BsFillCheckCircleFill } from "react-icons/bs";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";

interface ProductWithUserAndCount extends Product {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  _count: { productLikes: number };
}

interface SimilarProductWithCount extends Product {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  _count: { productLikes: number };
}

interface ProductDetailResult extends CommonResult {
  product?: ProductWithUserAndCount;
  similarProducts?: SimilarProductWithCount[];
  isLiked: boolean;
}

interface ChatCreateResult extends CommonResult {
  chat?: Chat;
}

const ProductDetail: NextPage<ProductDetailResult> = ({ product, similarProducts }) => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const { mutate: configMutate } = useSWRConfig();
  const { data, mutate } = useSWR<ProductDetailResult>(router.query.id && `/api/products/${router.query.id}`);
  const [productLikeMutation, { loading: productLikeLoading }] = useMutation<CommonResult>(`/api/products/${router.query.id}/like`);
  const [productDeleteMutation, { data: productDeleteData, loading: productDeleteLoading }] = useMutation<CommonResult>(`/api/products/${router.query.id}/delete`);
  const [productSoldOutMutation, { loading: productSoldOutLoading }] = useMutation<CommonResult>(`/api/products/${router.query.id}/soldout`);
  const [chatCreateMutation, { data: chatCreateData, loading: chatCreateLoading }] = useMutation<ChatCreateResult>(`/api/chats/create`);

  const handleToggleProductLike = async () => {
    if (me === undefined) {
      return router.push("/login");
    }
    if (data === undefined || productLikeLoading === true) {
      return;
    }

    mutate((prev: ProductDetailResult | undefined) => {
      if (prev && prev.product) {
        return {
          ...prev,
          isLiked: !prev.isLiked,
          product: { ...prev.product, _count: { productLikes: prev.isLiked === true ? prev.product?._count.productLikes - 1 : prev.product?._count.productLikes + 1 } },
        };
      }
    }, false);
    productLikeMutation();
  };

  const handleDeleteProduct = async () => {
    if (productDeleteLoading === true) {
      return;
    }
    await productDeleteMutation();
  };

  const handleSoldOut = async () => {
    if (productSoldOutLoading === true) {
      return;
    }

    mutate((prev) => {
      if (prev && prev.product) {
        return {
          ...prev,
          product: { ...prev.product, isSelling: false },
        };
      }
    }, false);
    await productSoldOutMutation();
    configMutate(`/api/users/${me?.username}`);
  };

  const handleChatWithSeller = async () => {
    if (me === undefined) {
      router.push("/login");
    }
    if (chatCreateLoading === true) {
      return;
    }
    await chatCreateMutation({ sellerId: product?.user.id });
  };

  useEffect(() => {
    if (chatCreateData && chatCreateData.ok === true) {
      router.push(`/chats/${chatCreateData.chat?.id}`);
    }
  }, [chatCreateData, router]);

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
    <MainLayout pageTitle={product?.name} hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          {/* ?????? ?????? ?????? */}
          <div>
            <div className={`${data?.product?.isSelling === false ? "opacity-50" : ""} cursor-pointer relative`}>
              <DetailImage cloudflareImageId={product?.cloudflareImageId} />
              {data?.product?.isSelling === false ? <BsFillCheckCircleFill size={100} className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> : null}
            </div>
            <div className="border-b pt-6 pb-5 flex items-center relative">
              <div>
                <Link href={`/users/${product?.user?.username}/posts`}>
                  <a>
                    <Avatar cloudflareImageId={product?.user?.cloudflareImageId} size="w-10 h-10" />
                  </a>
                </Link>
              </div>
              <div className="flex flex-col ml-2">
                <Link href={`/users/${product?.user?.username}/posts`}>
                  <a>
                    <Username text={product?.user?.username} size="text-[15px]" textDecoration={true} />
                  </a>
                </Link>
                <Region text={product?.user.address} size="text-[13px]" />
              </div>
              {product?.userId === me?.id ? <DeleteButton onClick={handleDeleteProduct} text="????????? ??????" loading={productDeleteLoading} /> : null}
            </div>
            <div className="py-8">
              <h1 className="text-xl font-semibold">{product?.name}</h1>
              <p className="text-xs text-gray-400 mt-2 mb-1.5 space-x-1">
                <span>??????</span>
                <Separator />
                <CreatedAt size="" date={product?.createdAt} />
              </p>
              <p className="font-bold text-[18px]">{Number(product?.price).toLocaleString("ko-KR")}???</p>
              <p className="font-normal my-5 leading-7 text-[17px]">{product?.description}</p>
              <p className="text-xs text-gray-400 space-x-1">
                <span>?????? {data?.product?._count.productLikes}</span>
              </p>
            </div>
            {data?.product ? (
              <div className="flex items-center justify-between py-4 border-t border-b">
                {data?.product?.userId === me?.id && data?.product?.isSelling === false ? (
                  <button type="button" disabled={true} className="w-full flex justify-center items-center px-4 py-2.5 h-[44px] max-h-[44px] rounded-[4px] text-white bg-gray-300">
                    ????????? ?????????????????????.
                  </button>
                ) : null}
                {data?.product?.userId === me?.id && data?.product?.isSelling === true ? (
                  <button
                    onClick={handleSoldOut}
                    type="button"
                    className="w-full flex justify-center items-center cursor-pointer px-4 py-2.5 h-[44px] max-h-[44px] rounded-[4px] text-white bg-orange-400 hover:bg-orange-500"
                  >
                    {productSoldOutLoading === true ? <Loading color="" size={20} /> : "?????? ??????"}
                  </button>
                ) : null}
                {data?.product?.isSelling === true && data?.product?.userId !== me?.id ? (
                  <button
                    onClick={handleChatWithSeller}
                    type="button"
                    className="w-full flex justify-center items-center cursor-pointer px-4 py-2.5 h-[44px] max-h-[44px] rounded-[4px] text-white bg-orange-400 hover:bg-orange-500"
                  >
                    ???????????? ????????????
                  </button>
                ) : null}
                {data?.product?.isSelling === false && data?.product?.userId !== me?.id ? (
                  <button type="button" disabled={true} className="w-full flex justify-center items-center px-4 py-2.5 h-[44px] max-h-[44px] rounded-[4px] text-white bg-gray-300">
                    ????????? ?????????????????????.
                  </button>
                ) : null}
                {data?.isLiked === true ? (
                  <AiFillHeart onClick={handleToggleProductLike} className="text-red-500 text-[44px] p-2 ml-2 cursor-pointer rounded-full hover:bg-gray-100" />
                ) : (
                  <AiOutlineHeart onClick={handleToggleProductLike} className="text-gray-300 text-[44px] p-2 ml-2 cursor-pointer rounded-full hover:bg-gray-100" />
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[78px]">
                <Loading color="orange" size={36} />
              </div>
            )}
          </div>

          {/* ?????? ????????? */}
          <div>
            <div className="my-8 flex justify-between">
              <h3 className="text-lg font-semibold">?????? ?????????</h3>
              <Link href="/products">
                <a className="text-orange-400 hover:text-orange-500 text-[15px]">??? ????????????</a>
              </Link>
            </div>
            <section>
              <div>
                <div className="content">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-12">
                    {similarProducts?.map((similarProduct) => (
                      <ProductItem key={similarProduct.id} {...similarProduct} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <FloatingButton href={me ? "/products/upload" : "/login"}>
          <BsBagPlusFill />
        </FloatingButton>
      </div>
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
  if (!context.params?.id) {
    return {
      props: {},
    };
  }

  const foundProduct = await prisma?.product.findUnique({
    where: { id: +context.params?.id },
    include: {
      user: { select: { id: true, username: true, cloudflareImageId: true, address: true } },
      _count: { select: { productLikes: true } },
    },
  });

  const nameArray = foundProduct?.name.split(" ").map((word: string) => ({
    name: { contains: word },
  }));

  const foundSimilarProducts = await prisma?.product.findMany({
    where: {
      AND: { id: { not: foundProduct?.id } },
      OR: nameArray,
    },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: { select: { id: true, username: true, cloudflareImageId: true, address: true } },
      _count: { select: { productLikes: true } },
    },
  });

  return {
    props: {
      ok: true,
      message: "?????? ????????? ?????????????????????.",
      product: JSON.parse(JSON.stringify(foundProduct)),
      similarProducts: JSON.parse(JSON.stringify(foundSimilarProducts)),
      isLiked: false,
    },
  };
};

export default ProductDetail;
