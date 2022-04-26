import Link from "next/link";
import Avatar from "../../components/avatar";
import MainLayout from "../../components/layouts/main-layout";
import ProfileLayout from "../../components/layouts/profile-layout";
import ProductItem from "../../components/items/product-item";
import Region from "../../components/region";
import Username from "../../components/username";

const Profile = () => {
  return (
    <MainLayout pageTitle="프로필" hasFooter={true}>
      <ProfileLayout>
        <div></div>
      </ProfileLayout>
    </MainLayout>
  );
};

export default Profile;
