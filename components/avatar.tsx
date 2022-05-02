interface AvatarProps {
  avatarUrl?: string | null;
  size: string;
}

const Avatar = ({ avatarUrl, size }: AvatarProps) => {
  return (
    <div>
      <img src={avatarUrl || "/images/basic_user.png"} alt="" className={`${size} aspect-square rounded-full cursor-pointer border border-gray-200`} />
    </div>
  );
};

export default Avatar;
