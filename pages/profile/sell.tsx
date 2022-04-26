import ProfileLayout from "../../components/layouts/profile-layout";
import ProductItem from "../../components/product-item";

const ProfileSell = () => {
  return (
    <ProfileLayout>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <ProductItem key={i} productUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" />
      ))}
    </ProfileLayout>
  );
};

export default ProfileSell;
