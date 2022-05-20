import "styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";

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
