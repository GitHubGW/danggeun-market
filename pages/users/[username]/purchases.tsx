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

const UserPurchases: NextPage = () => {
  const router: NextRouter = useRouter();
  const infiniteData = useSWRInfiniteScroll<SaleWithProduct>(router.query.username ? `/api/users/${router.query.username}/purchases` : null);

  return (
    <MainLayout pageTitle="구매 물품" hasFooter={true}>
      <UserLayout>
        {infiniteData?.map((purchase) => (
          <ProductItem
            key={purchase.product.id}
            id={purchase.product.id}
            name={purchase.product.name}
            price={purchase.product.price}
            imageUrl={purchase.product.imageUrl}
            user={purchase.product.user}
            _count={purchase.product._count}
          />
        ))}
      </UserLayout>
    </MainLayout>
  );
};

export default UserPurchases;
