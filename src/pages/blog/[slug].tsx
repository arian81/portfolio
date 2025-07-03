import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { PostsSchema, PostSchema, Post, Posts } from "../blog";
import { client } from "../../../sanity/lib/client";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { z } from "zod";
import { PortableText } from "@portabletext/react";
import NextImage from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import type { Image } from "sanity";
import ImageModal from "~/components/ImageModal";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import remarkCallout from "@r4ai/remark-callout";
import rehypeRaw from "rehype-raw";
import Head from "next/head";

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
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex w-full justify-center mb-5">
          <div className="rounded-lg p-3 sm:p-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#592407] dark:text-white font-dm-sans text-center">
            {post.title}
          </div>
        </div>
        <div className="bg-white rounded-lg">
            <div className="prose prose-base sm:prose-lg lg:prose-xl max-w-none p-4 sm:p-6 lg:p-8 font-dm-sans font-medium">
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

const myPortableTextComponents = {
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
