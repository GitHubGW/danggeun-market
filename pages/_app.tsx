import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import Footer from "../components/footer";
import Header from "../components/header";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* Header */}
      <Header />
      <Component {...pageProps} />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyApp;
