import Image from "next/image";
import Link from "next/link";
import carrotLogo1 from "public/images/carrot_logo1.png";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  cloudflareImageId: string;
  user: { address: string | null };
  _count: { productLikes: number };
}

const ProductItem = ({ id, name, price, cloudflareImageId, user, _count }: ProductItemProps) => {
  return (
    <Link href={`/products/${id}`}>
      <a>
        <Image
          width={208}
          height={208}
          src={cloudflareImageId ? `https://imagedelivery.net/mrfqMz0r88w_Qqln2FwPhQ/${cloudflareImageId}/productItem` : carrotLogo1}
          alt={name}
          className="border border-gray-100 rounded-2xl"
        />
        <h3 className="mt-3 mb-0.5">{name}</h3>
        <span className="font-semibold">{price}원</span>
        <p className="text-[13px] mt-1">{user?.address === null || user?.address === undefined ? "비공개" : user?.address}</p>
        <p className="text-[13px] text-gray-400">관심 {_count?.productLikes}</p>
      </a>
    </Link>
  );
};

export default ProductItem;
