import { NextPage } from "next";
import Link from "next/link";
import Avatar from "components/avatar";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ProductItem from "components/items/product-item";
import Region from "components/region";
import Username from "components/username";

const Users: NextPage = () => {
  return (
    <MainLayout pageTitle="프로필" hasFooter={true}>
      <UserLayout>
        <div></div>
      </UserLayout>
    </MainLayout>
  );
};

export default Users;
