import { faBlogger, faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-[#495057] py-16 h-[389px] max-h-[389px]">
      <nav className="content">
        <div className="flex justify-between pb-14 border-b border-gray-500">
          <div>
            <img src="/images/logo_white.svg" alt="" />
          </div>
          <ul className="pt-2 space-y-3">
            <li>
              <a href="https://www.daangn.com/trust" target="_blank" rel="noreferrer" className="text-white font-medium hover:underline">
                믿을 수 있는 중고거래
              </a>
            </li>
            <li>
              <a href="https://cs.kr.karrotmarket.com/wv/faqs" target="_blank" rel="noreferrer" className="text-white font-medium hover:underline">
                자주 묻는 질문
              </a>
            </li>
          </ul>
          <ul className="pt-2 space-y-3">
            <li>
              <a href="https://ads-local.daangn.com" target="_blank" rel="noreferrer" className="text-white font-medium hover:underline">
                광고주센터
              </a>
            </li>
            <li>
              <a href="https://www.daangnpay.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">
                당근페이
              </a>
            </li>
            <li>
              <a href="https://town.daangn.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">
                동네가게
              </a>
            </li>
          </ul>
          <ul className="pt-2 space-y-3">
            <li>
              <a href="https://team.daangn.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">
                회사 소개
              </a>
            </li>
            <li>
              <a href="https://team.daangn.com/jobs" target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">
                채용
              </a>
            </li>
          </ul>
          <ul className="pt-2 space-y-3">
            <li>
              <a href="https://www.daangn.com/policy/terms" target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">
                이용약관
              </a>
            </li>
            <li>
              <a href="https://www.daangn.com/policy/privacy" target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">
                개인정보처리방침
              </a>
            </li>
            <li>
              <a href="https://www.daangn.com/policy/location" target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">
                위치기반서비스 이용약관
              </a>
            </li>
          </ul>
        </div>
        <div className="flex gap-x-6 mt-6">
          <a href="https://www.facebook.com/daangn" target="_blank" rel="noreferrer" className="text-gray-400 text-3xl">
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
          <a href="https://www.instagram.com/daangnmarket" target="_blank" rel="noreferrer" className="text-gray-400 text-3xl">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://blog.naver.com/daangn" target="_blank" rel="noreferrer" className="text-gray-400 text-3xl">
            <FontAwesomeIcon icon={faBlogger} />
          </a>
        </div>
        <h5 className="mt-6 text-gray-400 text-xs">© {new Date().getFullYear()} GW. ALL RIGHTS RESERVED.</h5>
      </nav>
    </footer>
  );
};

export default Footer;
