interface AvatarProps {
  avatarUrl?: string | null;
  size: string;
  style?: any;
}

const Avatar = ({ avatarUrl, size, style }: AvatarProps) => {
  return (
    <div>
      <img src={avatarUrl || "/images/basic_user.png"} alt="" className={`${size} ${style} aspect-square rounded-full cursor-pointer border border-gray-200`} />
    </div>
  );
};

export default Avatar;
