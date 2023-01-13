import '../styles/globals.css'
import '../styles/adminstyle.css'
 import type { AppProps } from 'next/app'
import Head from "next/head";
 

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Dashboard Project</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://stijndv.com" />
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
