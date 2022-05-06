import Head from "next/head";
import Footer from "components/footer";
import Header from "components/header";

interface MainLayoutProps {
  pageTitle?: string;
  hasFooter: boolean;
  children: React.ReactNode;
}

const MainLayout = ({ pageTitle, hasFooter, children }: MainLayoutProps) => {
  return (
    <div>
      <Head>
        <title>{pageTitle || "당근마켓"} | 당신 근처의 당근마켓</title>
      </Head>
      <Header />
      {children}
      {hasFooter === true ? <Footer /> : null}
    </div>
  );
};

export default MainLayout;
