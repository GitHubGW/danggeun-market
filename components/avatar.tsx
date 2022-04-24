interface AvatarProps {
  avatarUrl: string;
  size: string;
}

const Avatar = ({ avatarUrl, size }: AvatarProps) => {
  return (
    <div>
      <img src={avatarUrl} alt="" className={`${size} aspect-square rounded-full cursor-pointer border border-gray-100`} />
    </div>
  );
};

export default Avatar;
