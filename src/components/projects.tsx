import ProjectGridItem from "./ProjectGridItem";
import { client } from "../../sanity/lib/client";
import { z } from "zod";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { NextPageWithLayout } from "~/pages/_app";

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  thumbnail: z.any().nullable(),
  stack: z.array(
    z.object({
      name: z.string(),
      icon: z.any(),
      url: z.string().url(),
    }),
  ),
});

type Project = z.infer<typeof ProjectSchema>;

const Projects: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ projects }) => {
  return (
    <div
      id="features"
      className="container mx-auto space-y-6 px-4 py-8 dark:bg-transparent md:py-12 lg:py-20"
    >
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {
          /* {gridItems.map((item, index) => (
          <ProjectGridItem key={index} {...item} />
        ))} */
          projects.map()
        }
      </div>
    </div>
  );
};

export const getStaticProps = (async () => {
  const postsQuery = `*[_type == "project"]{
    title,
    slug,
    thumbnail,
    description,
    stack[]->{
      name,
      url,
      icon
    }
  }`;
  const projects = ProjectSchema.parse(await client.fetch(postsQuery));

  return {
    props: {
      projects,
    },
  };
}) satisfies GetStaticProps<{ projects: Project[] }>;

export default ProjectItem;
