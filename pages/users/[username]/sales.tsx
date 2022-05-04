import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { Product, Sale } from ".prisma/client";

interface ProductWithUserAndCount extends Product {
  user: { address: string | null };
  _count: { productLikes: number };
}

interface SaleWithProduct extends Sale {
  product: ProductWithUserAndCount;
}

interface UserSalesResult extends CommonResult {
  sales?: SaleWithProduct[];
}

const UserSales: NextPage = () => {
  const router: NextRouter = useRouter();
  const { data } = useSWR<UserSalesResult>(router.query.username ? `/api/users/${router.query.username}/sales` : null);

  return (
    <MainLayout pageTitle="판매 물품" hasFooter={true}>
      <UserLayout>
        {data?.sales?.map((sale) => (
          <ProductItem key={sale.product.id} {...sale.product} />
        ))}
      </UserLayout>
    </MainLayout>
  );
};

export default UserSales;
