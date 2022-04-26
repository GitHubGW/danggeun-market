import Link from "next/link";

interface FloatingButtonProps {
  href: string;
  children: React.ReactNode;
}

const FloatingButton = ({ href, children }: FloatingButtonProps) => {
  return (
    <Link href={href}>
      <a className="w-16 h-16 text-3xl bg-orange-400 hover:bg-orange-500 text-white rounded-full flex justify-center items-center fixed bottom-12 right-12">{children}</a>
    </Link>
  );
};

export default FloatingButton;
