import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import { NextRouter, useRouter } from "next/router";
import { Product, Sale } from ".prisma/client";
import useSWRInfiniteScroll from "libs/client/useSWRInfiniteScroll";

interface ProductWithUserAndCount extends Product {
  user: { address: string | null };
  _count: { productLikes: number };
}

interface SaleWithProduct extends Sale {
  product: ProductWithUserAndCount;
}

const UserSales: NextPage = () => {
  const router: NextRouter = useRouter();
  const infiniteData = useSWRInfiniteScroll<SaleWithProduct>(router.query.username ? `/api/users/${router.query.username}/sales` : null);

  return (
    <MainLayout pageTitle="판매 물품" hasFooter={true}>
      <UserLayout>
        {infiniteData?.map((sale) => (
          <ProductItem
            key={sale.product.id}
            id={sale.product.id}
            name={sale.product.name}
            price={sale.product.price}
            imageUrl={sale.product.imageUrl}
            user={sale.product.user}
            _count={sale.product._count}
          />
        ))}
      </UserLayout>
    </MainLayout>
  );
};

export default UserSales;
