import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { PostsSchema, PostSchema, Post, Posts } from "../blog";
import { client } from "../../../sanity/lib/client";
import { useRouter } from "next/router";

const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.summary}</div>
    </div>
  );
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

  // const parsedPosts = PostsSchema.parse(posts); // how do i use this bad boy

  const paths = posts.map((post: Post) => ({
    params: { slug: post.url },
  }));

  // this seems legit man?

  return { paths, fallback: false };
}

export default BlogPost;
