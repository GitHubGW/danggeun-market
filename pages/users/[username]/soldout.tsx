import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import { Product } from ".prisma/client";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import prisma from "libs/server/prisma";
import { CommonResult } from "libs/server/withHandler";

interface ProductWithUserAndCount extends Product {
  user: { address: string | null };
  _count: { productLikes: number };
}

interface UserSoldOutResult extends CommonResult {
  products?: ProductWithUserAndCount[];
}

const UserSoldOut: NextPage<UserSoldOutResult> = ({ products }) => {
  return (
    <MainLayout pageTitle="판매 완료" hasFooter={true}>
      <UserLayout>
        {products?.map((product) => (
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
  const foundProducts = await prisma.product.findMany({
    where: {
      user: { username: String(context.params?.username) },
      isSelling: false,
    },
    include: {
      user: { select: { address: true } },
      _count: { select: { productLikes: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      ok: true,
      message: "사용자 판매 완료 물품 보기에 성공하였습니다.",
      products: JSON.parse(JSON.stringify(foundProducts)),
    },
  };
};

export default UserSoldOut;
