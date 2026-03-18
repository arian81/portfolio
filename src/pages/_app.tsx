import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppType } from "next/dist/shared/lib/utils";
import { DM_Sans, Open_Sans, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import React, { type ReactElement, type ReactNode } from "react";

import "~/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "easymde/dist/easymde.min.css";
import "../styles/catppuccin-frape.css";
import "../styles/callout-style.css";


const outfit = Outfit({ subsets: ["latin"] });
const _open = Open_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });
const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
          <style jsx global>{`
            html {
              font-family: ${outfit.style.fontFamily};
            }
            :root {
              --font-dm-sans: ${dmSans.style.fontFamily};
            }
          `}</style>
          {getLayout(<Component {...pageProps} />)}
          <Analytics />
          <SpeedInsights />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
