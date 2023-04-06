import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import Whoai from "~/components/Whoai";
import Socials from "~/components/Socials";
import LastFm from "~/components/LastFM";
import Copyright from "~/components/Copyright";
import Test from "~/components/TypeWrite";

const Home: NextPage = () => {
  return (
    <>
      <Head>
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
        <meta property="og:image" content="https://arian.gg/assets/meta.png" />

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
        <meta name="twitter:image" content="https://arian.gg/assets/meta.png" />
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
        <meta name="msapplication-config" content="/assets/browserconfig.xml" />
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

        {/*  */}
        <link rel="canonical" href="https://arian.gg" />
        <meta name="viewport" content="width=device-width" />
        <title>Arian Ahmadinejad</title>
      </Head>
      <main className="relative min-h-screen w-full bg-orange-200 dark:bg-[#161616]">
        <div className="m-auto flex min-h-screen w-auto flex-col items-center justify-center gap-10 pb-24 pt-48">
          <div className="absolute top-0 w-full p-2">
            <Header />
          </div>
          <Whoai />
          <Socials />
          <a
            className="btn-outline btn-accent btn-lg btn rounded-full border-[3px] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
            href="resume.pdf"
          >
            Resume
          </a>
          <div className="absolute bottom-0 right-0 z-10 w-full md:w-fit md:p-4">
            <LastFm />
          </div>
          <Copyright />
        </div>
      </main>
    </>
  );
};

export default Home;
