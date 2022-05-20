import Link from "next/link";
import Region from "components/region";
import Username from "components/username";
import CreatedAt from "components/created-at";
import Separator from "components/separator";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

interface PostItemProps {
  id: number;
  text: string;
  createdAt?: Date | string;
  user: { username: string; address: string | null };
  _count: { postComments: number; postLikes: number };
}

const PostItem = ({ id, text, createdAt, user, _count }: PostItemProps) => {
  return (
    <div className="py-6 border-b border-gray-200 last-of-type:border-none">
      <Link href={`/posts/${id}`}>
        <a>
          <h2 className="cursor-pointer">{text.length > 80 ? `${text.slice(0, 80)}...` : text}</h2>
        </a>
      </Link>
      <div className="flex justify-between mt-1">
        <div className="space-x-[1px]">
          <Link href={`/users/${user.username}/posts`}>
            <a>
              <Username text={user.username} size="text-[14px]" textDecoration={true} />
            </a>
          </Link>
          <Separator />
          <Region text={user.address} size="text-[14px]" />
          <Separator />
          <CreatedAt date={createdAt} size="text-[14px]" />
        </div>
        <div className="flex">
          <Link href={`/posts/${id}`}>
            <a className="flex space-x-2">
              <div className="flex items-center">
                <FaRegComment className="text-gray-400 mr-1" />
                <span className="text-sm">{_count.postComments}</span>
              </div>
              <div className="flex items-center">
                <AiOutlineHeart className="text-red-400 mr-0.5" />
                <span className="text-sm">{_count.postLikes}</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
