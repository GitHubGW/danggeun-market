import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <Html lang="ko">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
