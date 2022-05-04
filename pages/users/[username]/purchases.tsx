import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";
import { Product, Sale } from ".prisma/client";
import { CommonResult } from "libs/server/withHandler";

interface ProductWithUserAndCount extends Product {
  user: { address: string | null };
  _count: { productLikes: number };
}

interface SaleWithProduct extends Sale {
  product: ProductWithUserAndCount;
}

interface UserPurchasesResult extends CommonResult {
  purchases?: SaleWithProduct[];
}

const UserPurchases: NextPage = () => {
  const router: NextRouter = useRouter();
  const { data } = useSWR<UserPurchasesResult>(router.query.username ? `/api/users/${router.query.username}/purchases` : null);

  return (
    <MainLayout pageTitle="구매 물품" hasFooter={true}>
      <UserLayout>
        {data?.purchases?.map((purchase) => (
          <ProductItem key={purchase.product.id} {...purchase.product} />
        ))}
      </UserLayout>
    </MainLayout>
  );
};

export default UserPurchases;
