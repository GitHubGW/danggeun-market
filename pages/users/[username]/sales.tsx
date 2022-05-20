import prisma from "libs/server/prisma";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import { Product, User } from ".prisma/client";
import { CommonResult } from "libs/server/withHandler";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";

interface ProductWithUserAndCount extends Product {
  user: { address: string | null };
  _count: { productLikes: number };
}

interface UserSalesResult extends CommonResult {
  products?: ProductWithUserAndCount[];
  user?: User;
}

const UserSales: NextPage<UserSalesResult> = ({ products, user }) => {
  return (
    <MainLayout pageTitle="판매 물품" hasFooter={true}>
      <UserLayout user={user}>
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
      isSelling: true,
    },
    include: {
      user: { select: { address: true } },
      _count: { select: { productLikes: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const foundUser = await prisma.user.findFirst({
    where: { username: String(context.params?.username) },
  });

  return {
    props: {
      ok: true,
      message: "사용자 판매 중인 물품 보기에 성공하였습니다.",
      products: JSON.parse(JSON.stringify(foundProducts)),
      user: JSON.parse(JSON.stringify(foundUser)),
    },
    revalidate: 10,
  };
};

export default UserSales;
