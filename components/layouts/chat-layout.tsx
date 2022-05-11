import Link from "next/link";
import Avatar from "components/avatar";
import Region from "components/region";
import Username from "components/username";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="wrapper without-header">
      <div className="content">
        <div className="flex h-full">
          <div className="flex-1 border-l">
            <nav className="h-full">
              <div className="py-2 px-3 max-h-[60px] h-[60px]">
                <Link href="/">
                  <a className="flex items-center space-x-2.5">
                    <Avatar
                      cloudflareImageId="https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_256_disabled-97ac2510cb2860b9e37caf23beb1e8e0ca130152a119b65402c4673af18bf2a1.png"
                      size="w-11 h-11"
                    />
                    <Username text="슈가" size="text-base" textDecoration={false} />
                  </a>
                </Link>
              </div>
              <ul className="border-t border-b h-[calc(100%_-_120px)] overflow-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                  <li key={i} className="border-b last-of-type:border-none py-3 px-3 hover:bg-gray-50">
                    <Link href="/chats/1">
                      <a className="flex items-center space-x-2">
                        <div>
                          <Avatar
                            cloudflareImageId="https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_256_disabled-97ac2510cb2860b9e37caf23beb1e8e0ca130152a119b65402c4673af18bf2a1.png"
                            size="w-9 h-9"
                          />
                        </div>
                        <div>
                          <div className="space-x-1.5">
                            <Username text="슈가" size="text-[14px]" textDecoration={false} />
                            <Region text="서울 강남구" size="text-[12px]" />
                          </div>
                          <div className="text-[12px]">
                            <span>네 저도 감사합니다. 잘 쓸게요!</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="py-2.5 px-2 max-h-14 h-14">
                <div className="inline-flex items-center px-2 py-2 rounded-lg text-gray-400 text-sm hover:bg-gray-100 transition-all">
                  <a href="https://www.daangn.com/wv/faqs?kind=karrotchat" target="_blank" rel="noreferrer">
                    자주묻는 질문
                  </a>
                  <span className="ml-1">
                    <AiOutlineQuestionCircle />
                  </span>
                </div>
              </div>
            </nav>
          </div>
          <div className="min-w-[730px] max-w-[730px] border-l border-r">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
