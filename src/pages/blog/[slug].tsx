import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { PostsSchema, PostSchema, Post, Posts } from "../blog";
import { client } from "../../../sanity/lib/client";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { z } from "zod";

const BlogPost: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  return (
    <div className="m-auto  flex h-[35rem]  w-[35rem] justify-center border-2 border-red-600">
      <h1 className="p-5 text-3xl font-bold text-[#592407]">{post.title}</h1>
      {/* <body className="p-5">{post.body}</body> */}
    </div>
  );
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
