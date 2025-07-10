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

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { env } from "~/env.mjs";

if (typeof window !== "undefined") {
  // checks that we are client-side
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

const outfit = Outfit({ subsets: ["latin"] });
const _open = Open_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });
const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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
        <PostHogProvider client={posthog}>
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
        </PostHogProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
