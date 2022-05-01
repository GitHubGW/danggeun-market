import "styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

config.autoAddCss = false;

const fetcher = async (url: string) => {
  return await (await fetch(url)).json();
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <div>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
};

export default MyApp;
