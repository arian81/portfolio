import ProjectGridItem from "~/components/ProjectGridItem";
import { client } from "../../sanity/lib/client";
import { z } from "zod";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { NextPageWithLayout } from "~/pages/_app";
import Layout from "~/components/Layout";
import { ReactElement, useState } from "react";
import CustomHead from "~/components/CustomHead";

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  projectUrl: z.string().url(),
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
    <>
      <CustomHead />
      <div
        id="features"
        className="container mx-auto space-y-6 px-4 py-8 dark:bg-transparent md:py-12 lg:py-20"
      >
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {projects.map((project: Project, index: number) => (
            <ProjectGridItem
              title={project.title}
              thumbnail={project.thumbnail}
              description={project.description}
              projectUrl={project.projectUrl}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

//  satisfies GetStaticProps<{ projects: Project[] }>;
export const getStaticProps = async () => {
  const postsQuery = `*[_type == "project"] | order(priority asc) {
    title,
    slug,
    thumbnail,
    "projectUrl": project_url,
    description,
    stack[]->{
      name,
      url,
      icon
    }
  }`;

  const projects = ProjectSchema.array().parse(await client.fetch(postsQuery));

  return {
    props: {
      projects,
    },
  };
};

export default Projects;
