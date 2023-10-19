import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import React from "react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { Outfit } from "next/font/google";
import { Open_Sans } from "next/font/google";
import Script from 'next/script'


import "~/styles/globals.css";

const outfit = Outfit({ subsets: ["latin"] });

const open = Open_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Head>
          <Script async crossOrigin="anonymous" src="https://pep.dev/pep.js#Tu9mVg8m"></Script>
          <meta
            name="description"
            content="Hey this is Arian Ahmadinejad. Software engineer from Canada, pursuing computer science to hack into the Matrix."
          />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://arian.gg" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Arian Ahmadinejad | Software Engineer"
          />
          <meta
            property="og:description"
            content="Hey this is Arian Ahmadinejad. Software engineer from Canada, pursuing computer science to hack into the Matrix."
          />
          <meta
            property="og:image"
            content="https://arian.gg/assets/meta.png"
          />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="arian.gg" />
          <meta property="twitter:url" content="https://arian.gg" />
          <meta
            name="twitter:title"
            content="Arian Ahmadinejad | Software Engineer"
          />
          <meta
            name="twitter:description"
            content="Hey this is Arian Ahmadinejad. Software engineer from Canada, pursuing computer science to hack into the Matrix."
          />
          <meta
            name="twitter:image"
            content="https://arian.gg/assets/meta.png"
          />
          <meta charSet="utf-8" />
          {/* <!-- Icons for everything --> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/favicon-16x16.png"
          />
          <link rel="manifest" href="/assets/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/assets/safari-pinned-tab.svg"
            color="#592406"
          />
          <link rel="shortcut icon" href="/assets/favicon.ico" />
          <meta name="msapplication-TileColor" content="#603cba" />
          <meta
            name="msapplication-config"
            content="/assets/browserconfig.xml"
          />
          <meta
            name="theme-color"
            content="#fed7aa"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#161616"
            media="(prefers-color-scheme: dark)"
          />

          <link rel="canonical" href="https://arian.gg" />
          <meta
            name="viewport"
            content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=0"
          />
          <title>Arian Ahmadinejad</title>
        </Head>
        <style jsx global>{`
          html {
            font-family: ${outfit.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
