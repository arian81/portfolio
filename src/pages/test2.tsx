import { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import React from "react";
import Layout from "~/components/Layout";
import About from "./whoami";
import Projects from "./projects";
import { z } from "zod";
import { NextPageWithLayout } from "./_app";
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
import { client } from "../../sanity/lib/client";
import ProjectGridItem from "~/components/ProjectGridItem";
import Home from ".";

type Project = z.infer<typeof ProjectSchema>;
const Test: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ projects }) => {
  return (
    <>
      <About />

      <Home />
      <div
        id="features"
        className="container mx-auto space-y-6 px-4 py-8 dark:bg-transparent md:py-12 lg:py-20"
      >
        <h2 className="text-2xl font-bold text-white">Projects</h2>
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

Test.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div className="m-auto">{page}</div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const postsQuery = `*[_type == "project"]{
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

export default Test;
