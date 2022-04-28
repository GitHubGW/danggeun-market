import MainLayout from "../../components/layouts/main-layout";
import ProfileLayout from "../../components/layouts/profile-layout";
import ProductItem from "../../components/items/product-item";

const ProfileLike = () => {
  return (
    <MainLayout pageTitle="관심 물품" hasFooter={true}>
      <ProfileLayout>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ProductItem key={i} productUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" />
        ))}
      </ProfileLayout>
    </MainLayout>
  );
};

export default ProfileLike;