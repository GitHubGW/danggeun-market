import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";

const UserBuy: NextPage = () => {
  return (
    <MainLayout pageTitle="구매 물품" hasFooter={true}>
      <UserLayout>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ProductItem key={i} productUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" />
        ))}
      </UserLayout>
    </MainLayout>
  );
};

export default UserBuy;
