import { client } from "../../sanity/lib/client";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { z } from "zod";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import BlogPostItem from "~/components/BlogPostItem";

export const PostSchema = z.object({
  title: z.string(),
  url: z.string(),
  body: z.array(z.any()), // god knows how to type this
  mainImage: z.any().nullable(), // god knows how to type this
  summary: z.string().max(150),
  categories: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .nullable(),
});

export const PostsSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
export type Posts = z.infer<typeof PostsSchema>;

const Blog: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  return (
    <div className="relative z-10 flex w-full flex-col gap-5 py-16 md:gap-10 md:p-2 md:py-24">
      {posts.map((post: Post, index: number) => (
        <BlogPostItem
          title={post.title}
          url={post.url}
          summary={post.summary}
          key={index}
          mainImage={post.mainImage}
        ></BlogPostItem>
      ))}
    </div>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = (async () => {
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
      }
        `;
  const posts = PostsSchema.parse(await client.fetch(postsQuery));

  return {
    props: {
      posts,
    },
  };
}) satisfies GetStaticProps<{ posts: Posts }>;

export default Blog;
