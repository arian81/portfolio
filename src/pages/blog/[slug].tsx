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

const markdown =
  "``` js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n ```\n Just a link: www.nasa.gov.";

const BlogPost: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-5 pt-10">
      <div className="flex w-full justify-center">
        <div className=" rounded-lg p-5 text-2xl font-bold text-[#592407] dark:text-white">
          {post.title}
        </div>
      </div>
      <div className=" bg-white md:rounded-lg">
        {/* <div className="prose w-screen p-5">
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        </div>
        < */}
        <div className="prose w-screen p-5">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeHighlight, rehypeMathjax]}
          >
            {post.body}
          </Markdown>
        </div>
      </div>
    </div>
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
  }`;
  const posts = PostsSchema.parse(await client.fetch(postsQuery));

  const paths = posts.map((post: Post) => ({
    params: { slug: post.url },
  }));

  return { paths, fallback: false };
}

export default BlogPost;
