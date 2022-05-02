import { NextPage } from "next";
import ProductItem from "components/items/product-item";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";

const UserCommunity: NextPage = () => {
  return (
    <MainLayout pageTitle="동네생활" hasFooter={true}>
      <UserLayout>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ProductItem key={i} productUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" />
        ))}
      </UserLayout>
    </MainLayout>
  );
};

export default UserCommunity;
