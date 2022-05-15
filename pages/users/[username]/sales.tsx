import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import { NextRouter, useRouter } from "next/router";
import { Product } from ".prisma/client";
import useSWRInfiniteScroll from "libs/client/useSWRInfiniteScroll";

interface ProductWithUserAndCount extends Product {
  user: { address: string | null };
  _count: { productLikes: number };
}

const UserSales: NextPage = () => {
  const router: NextRouter = useRouter();
  const infiniteData = useSWRInfiniteScroll<ProductWithUserAndCount>(router.query.username ? `/api/users/${router.query.username}/sales` : null);

  return (
    <MainLayout pageTitle="판매 물품" hasFooter={true}>
      <UserLayout>
        {infiniteData?.map((product) => (
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

export default UserSales;
