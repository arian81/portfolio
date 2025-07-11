import remarkCallout from "@r4ai/remark-callout";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import type { ReactElement } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Image } from "sanity";
import ImageModal from "~/components/ImageModal";
import Layout from "~/components/Layout";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import type { NextPageWithLayout } from "../_app";
import { type Post, PostSchema, PostsSchema } from "../blog";

const formatDate = (dateString: string): string => {
  if (dateString === "") return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

const BlogPost: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  const ogImageUrl = `https://arian.gg/api/og?title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.summary)}&publishTime=${encodeURIComponent(formatDate(post.publishedAt ?? ""))}`;
  return (
    <>
      <Head>
        <title>{`Arian's blog | ${post.title}`}</title>
        <meta property="og:title" content={`Arian's blog | ${post.title}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={post.summary} />
        <meta property="og:url" content={`https://arian.gg/blog/${post.url}`} />
        <meta property="description" content={post.summary} />
        <meta property="og:site_name" content="Arian's Blog"></meta>

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="arian.gg" />
        <meta
          property="twitter:url"
          content={`https://arian.gg/blog/${post.url}`}
        />
        <meta property="twitter:title" content={post.title}></meta>
        <meta property="twitter:description" content={post.summary} />

        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />

        {/* meta images */}
        <meta property="og:image" content={ogImageUrl} />
        <meta property="twitter:image" content={ogImageUrl} />
      </Head>
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-10 lg:px-12 lg:pb-16">
        <div className="mb-5 flex w-full justify-center">
          <div className="rounded-lg p-3 text-center font-dm-sans text-2xl font-extrabold text-[#592407] dark:text-white sm:p-5 sm:text-3xl lg:text-4xl">
            {post.title}
          </div>
        </div>
        <div className="rounded-lg bg-white">
          <div className="prose prose-base max-w-none p-4 font-dm-sans font-medium sm:prose-lg lg:prose-xl sm:p-6 lg:p-8">
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath, remarkCallout]}
              rehypePlugins={[rehypeHighlight, rehypeMathjax, rehypeRaw]}
            >
              {post.body}
            </Markdown>
          </div>
        </div>
      </div>
    </>
  );
};

const _myPortableTextComponents = {
  types: {
    image: ({ value }: { value: Image }) => {
      return (
        // <NextImage src={urlForImage(value)} alt="" width={1000} height={1000} />
        <ImageModal imageUrl={urlForImage(value)} />
      );
    },
  },
};

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = (async (ctx) => {
  const { slug } = ctx.params || {};

  const postQuery = `
  *[_type == "post" && slug.current == "${slug}"] | order(_createdAt desc) {
    title,
    "url": slug.current,
    body,
    mainImage,
    summary,
    categories[]->{
        name,
        description
    },
    publishedAt
  }[0]`;
  const post = PostSchema.parse(await client.fetch(postQuery));

  return {
    props: {
      post,
    },
  };
}) satisfies GetStaticProps<{ post: Post }>;

export async function getStaticPaths() {
  const postsQuery = `*[_type == "post"] | order(_createdAt desc) {
    title,
    "url": slug.current,
    body,
    mainImage,
    summary,
    categories[]->{
        name,
        description
    },
    publishedAt
  }`;
  const posts = PostsSchema.parse(await client.fetch(postsQuery));

  const paths = posts.map((post: Post) => ({
    params: { slug: post.url },
  }));

  return { paths, fallback: false };
}

export default BlogPost;
