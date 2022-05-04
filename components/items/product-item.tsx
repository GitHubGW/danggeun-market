import Link from "next/link";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  user: { address: string | null };
  _count: { productLikes: number };
}

const ProductItem = ({ id, name, price, imageUrl, user, _count }: ProductItemProps) => {
  return (
    <Link href={`/products/${id}`}>
      <a>
        <img src={imageUrl || "/images/carrot_logo1.png"} alt={name} className="border border-gray-100 w-52 h-52 rounded-2xl" />
        <h3 className="mt-3 mb-0.5">{name}</h3>
        <span className="font-semibold">{price}원</span>
        <p className="text-[13px] mt-1">{user?.address === null || user?.address === undefined ? "비공개" : user?.address}</p>
        <p className="text-[13px] text-gray-400">관심 {_count?.productLikes}</p>
      </a>
    </Link>
  );
};

export default ProductItem;
