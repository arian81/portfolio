import Head from "next/head";

const CustomHead = () => {
  return (
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
      <meta property="og:site_name" content="Arian's Portfolio"></meta>

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

      <link rel="canonical" href="https://arian.gg" />
      <meta
        name="viewport"
        content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=0"
      />
      <title>Arian Ahmadinejad</title>
    </Head>
  );
};

export default CustomHead;
