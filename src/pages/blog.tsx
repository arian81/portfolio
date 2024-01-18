import { NextPage } from "next";
import { client } from "../../sanity/lib/client";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  url: z.string().nullable(),
  body: z.array(z.any()).nullable(), // god knows how to type this
  mainImage: z.any().nullable(), // god knows how to type this
  summary: z.string().nullable(),
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

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <main className="relative min-h-screen w-full bg-orange-200 dark:bg-[#161616]">
        <div className="m-auto flex min-h-screen w-auto flex-col items-center justify-center gap-10 pb-24 pt-48">
          <div className="absolute top-0 w-full p-2">
            <h1 className="text-center text-4xl font-bold text-[#592407] dark:text-[#ccc]">
              Blog
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            {posts.map((post: Post, index: number) => (
              <div
                className="flex flex-col gap-2 rounded-md bg-white p-4 dark:bg-[#292929] dark:text-[#ccc]"
                key={index}
              >
                <h1 className="text-2xl font-bold text-[#592407] dark:text-[#ccc]">
                  {post.title}
                </h1>
                <p className="text-lg text-[#592407] dark:text-[#ccc]">
                  {post.summary}
                </p>
                <a
                  className="btn btn-outline btn-lg rounded-full border-[3px] border-[#592407] text-[#592407] hover:border-transparent hover:bg-[#592407] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
                  href={`/blog/${post.url}`}
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
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
