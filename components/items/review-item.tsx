import Link from "next/link";
import useMe from "libs/client/useMe";
import Region from "components/region";
import Avatar from "components/avatar";
import Username from "components/username";
import CreatedAt from "components/created-at";
import DeleteButton from "components/delete-button";
import { AiFillStar } from "react-icons/ai";

interface ReviewItemProps {
  id: number;
  text: string;
  rating: number;
  createdAt?: Date | string;
  from: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  handleDeleteReview: () => any;
  loading?: boolean;
}

const ReviewItem = ({ id, text, rating, createdAt, from, handleDeleteReview, loading }: ReviewItemProps) => {
  const me = useMe();

  return (
    <div className="border-b border-b-gray-200 py-5 last-of-type:border-none">
      <div className="flex items-center space-x-2 relative">
        <Link href={`/users/${from?.username}/posts`}>
          <a>
            <Avatar cloudflareImageId={from?.cloudflareImageId} size="w-6 h-6" />
          </a>
        </Link>
        <Link href={`/users/${from?.username}/posts`}>
          <a>
            <Username text={from?.username} size="text-[15px]" textDecoration={true} />
          </a>
        </Link>
        <Region text={from?.address} size="text-[13px]" />
        <div className="flex">
          {[1, 2, 3, 4, 5].map((index) => (
            <AiFillStar key={index} color={rating >= index ? "gold" : "lightgray"} />
          ))}
        </div>
        {from.id === me?.id ? <DeleteButton onClick={handleDeleteReview} text="삭제" loading={loading} /> : null}
      </div>
      <div className="mt-3 mb-1 text-[15px]">{text}</div>
      <CreatedAt date={createdAt} size="text-[13px]" />
    </div>
  );
};

export default ReviewItem;
