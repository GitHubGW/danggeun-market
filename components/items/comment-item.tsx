import Link from "next/link";
import Avatar from "components/avatar";
import CreatedAt from "components/created-at";
import Region from "components/region";
import Username from "components/username";
import DeleteButton from "components/delete-button";
import { User } from ".prisma/client";

interface CommentItemProps {
  id: number;
  text: string;
  createdAt?: Date | string;
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  me?: User;
  handleDeleteComment: (postCommentId: number) => Promise<void>;
}

const CommentItem = ({ id, text, createdAt, user, me, handleDeleteComment }: CommentItemProps) => {
  return (
    <div className="border-b border-b-gray-200 py-5 last-of-type:border-none">
      <div className="flex items-center space-x-2 relative">
        <Link href={`/users/${user?.username}/posts`}>
          <a>
            <Avatar cloudflareImageId={user?.cloudflareImageId} size="w-6 h-6" />
          </a>
        </Link>
        <Link href={`/users/${user?.username}/posts`}>
          <a>
            <Username text={user?.username} size="text-[15px]" textDecoration={true} />
          </a>
        </Link>
        <Region text={user?.address} size="text-[13px]" />
        {user.id === me?.id ? <DeleteButton onClick={() => handleDeleteComment(id)} text="삭제" /> : null}
      </div>
      <div className="mt-3 mb-1 text-[15px]">{text}</div>
      <CreatedAt date={createdAt} size="text-[13px]" />
    </div>
  );
};

export default CommentItem;
