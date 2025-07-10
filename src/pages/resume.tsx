import Head from "next/head";
import Image from "next/image";
import type { ReactElement } from "react";
import CustomHead from "~/components/CustomHead";
import Layout from "~/components/Layout";
import {
  education,
  experience,
  hackathons,
  personalInfo,
  projects,
  skills,
} from "~/data/resumeData";
import type { NextPageWithLayout } from "./_app";

const Resume: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Arian Ahmadinejad | Resume</title>
        <meta name="description" content="Arian Ahmadinejad's Resume" />
      </Head>
      <CustomHead />

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          {/* Sidebar - Personal Info */}
          <aside className="h-fit rounded-md bg-white p-4 shadow-md dark:bg-gray-800 md:col-span-4 md:rounded-xl md:p-6 lg:col-span-3">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-[#592407] dark:border-orange-200 dark:border-opacity-20">
                <Image
                  src="/images/avatar.jpeg"
                  alt={personalInfo.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              {/* Name and Title */}
              <h1 className="mb-1 text-center text-2xl font-bold text-gray-800 dark:text-orange-200">
                {personalInfo.name}
              </h1>
              <p className="mb-6 text-center text-gray-600 dark:text-white dark:text-opacity-90">
                {personalInfo.title}
              </p>

              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>

            {/* Contact Information */}
            <div className="mt-6 space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-start rounded-lg p-2 transition-all duration-200 hover:bg-[#592407]/5 hover:text-[#592407] dark:hover:bg-orange-200/10 dark:hover:text-orange-200"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#592407] transition-transform duration-200 group-hover:scale-110 dark:bg-orange-200 dark:bg-opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white dark:text-orange-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Email
                  </p>
                  <span className="break-words text-sm text-gray-800 dark:text-white">
                    hey@arian.gg
                  </span>
                </div>
              </a>

              <a
                href={personalInfo.website}
                className="flex items-start rounded-lg p-2 transition-all duration-200 hover:bg-[#592407]/5 hover:text-[#592407] dark:hover:bg-orange-200/10 dark:hover:text-orange-200"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#592407] transition-transform duration-200 group-hover:scale-110 dark:bg-orange-200 dark:bg-opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white dark:text-orange-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Website
                  </p>
                  <span className="text-sm text-gray-800 dark:text-white">
                    {personalInfo.website.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              </a>

              <a
                href={personalInfo.github}
                className="flex items-start rounded-lg p-2 transition-all duration-200 hover:bg-[#592407]/5 hover:text-[#592407] dark:hover:bg-orange-200/10 dark:hover:text-orange-200"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#592407] transition-transform duration-200 group-hover:scale-110 dark:bg-orange-200 dark:bg-opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white dark:text-orange-200"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </g>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    GitHub
                  </p>
                  <span className="text-sm text-gray-800 dark:text-white">
                    {personalInfo.github.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                className="flex items-start rounded-lg p-2 transition-all duration-200 hover:bg-[#592407]/5 hover:text-[#592407] dark:hover:bg-orange-200/10 dark:hover:text-orange-200"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#592407] transition-transform duration-200 group-hover:scale-110 dark:bg-orange-200 dark:bg-opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white dark:text-orange-200"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </g>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    LinkedIn
                  </p>
                  <span className="text-sm text-gray-800 dark:text-white">
                    {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              </a>
            </div>

            {/* Education in Sidebar */}
            <div className="mt-8">
              <h3 className="mb-4 flex items-center text-lg font-bold text-gray-800 dark:text-orange-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5 text-[#592407] dark:text-orange-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
                  >
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-orange-200">
                      {edu.school}
                    </h4>
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center rounded-full bg-[#592407]/10 px-2.5 py-0.5 text-xs font-medium text-[#592407] dark:bg-orange-200/10 dark:text-orange-200">
                        {edu.date}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-600 dark:text-white dark:text-opacity-90">
                      {edu.degree}
                    </p>
                    <div className="mt-1 flex items-center">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills in Sidebar */}
            <div className="mt-8">
              <h3 className="mb-4 flex items-center text-lg font-bold text-gray-800 dark:text-orange-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5 text-[#592407] dark:text-orange-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
                  >
                    <h5 className="mb-2 text-sm font-semibold text-gray-800 dark:text-orange-200">
                      {skill.category}
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.split(", ").map((item, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="rounded-md bg-white p-5 shadow-md dark:bg-gray-800 md:col-span-8 md:rounded-xl md:p-8 lg:col-span-9">
            {/* Resume Header with Download Button */}
            <header className="mb-8 flex flex-col justify-between border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex-row sm:items-center">
              <h2 className="relative text-3xl font-bold text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:bg-[#592407] after:content-[''] dark:text-orange-200 dark:after:bg-orange-200">
                Resume
              </h2>

              <a
                href="/resume.pdf"
                className="group mt-4 flex items-center justify-center gap-2 rounded-full bg-[#592407] px-5 py-2.5 font-medium text-white transition-all duration-300 hover:bg-[#6d2c09] dark:bg-orange-200 dark:bg-opacity-20 dark:text-orange-200 dark:hover:bg-opacity-30 sm:mt-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </a>
            </header>

            {/* Experience Timeline */}
            <section className="mb-10">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#592407] dark:bg-orange-200 dark:bg-opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white dark:text-orange-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-orange-200">
                  Experience
                </h3>
              </div>

              <div className="space-y-6 md:space-y-8">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 md:rounded-lg md:p-6"
                  >
                    <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-orange-200">
                        {exp.title}
                      </h4>
                      <span className="inline-flex items-center rounded-full bg-[#592407]/10 px-3 py-1 text-sm font-medium text-[#592407] dark:bg-orange-200/10 dark:text-orange-200">
                        {exp.date}
                      </span>
                    </div>

                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <a
                        href={exp.organizationUrl}
                        className="font-medium text-[#592407] hover:underline dark:text-orange-200"
                      >
                        {exp.organization}
                      </a>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        | {exp.location}
                      </span>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {exp.technologies.split(", ").map((tech, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="ml-5 list-disc space-y-2 text-gray-600 dark:text-white dark:text-opacity-80">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="leading-relaxed">
                          <span
                            dangerouslySetInnerHTML={{ __html: achievement }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-10">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#592407] dark:bg-orange-200 dark:bg-opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white dark:text-orange-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-orange-200">
                  Projects
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="relative rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 md:rounded-lg md:p-6"
                  >
                    <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-orange-200">
                      <a
                        href={project.url}
                        className="hover:text-[#592407] hover:underline dark:hover:text-orange-200"
                      >
                        {project.title}
                      </a>
                    </h4>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {project.subtitle}
                      </span>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.split(", ").map((tech, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-white dark:text-opacity-80">
                      {project.achievements.map((achievement, i) => (
                        <li key={i}>
                          <span
                            dangerouslySetInnerHTML={{ __html: achievement }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Hackathons */}
            <section className="mb-10">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#592407] dark:bg-orange-200 dark:bg-opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white dark:text-orange-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-orange-200">
                  Hackathons
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                {hackathons.map((hackathon, index) => (
                  <div
                    key={index}
                    className="relative rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 md:rounded-lg md:p-6"
                  >
                    <div className="absolute right-0 top-0 rounded-bl-md rounded-tr-md bg-[#592407] px-2 py-0.5 text-xs font-bold text-white dark:bg-orange-200 dark:text-gray-800 md:-right-2 md:-top-2 md:rounded-full md:rounded-bl-lg md:px-3 md:py-1">
                      {hackathon.event}
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-orange-200">
                      <a
                        href={hackathon.url}
                        className="hover:text-[#592407] hover:underline dark:hover:text-orange-200"
                      >
                        {hackathon.title}
                      </a>
                    </h4>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {hackathon.subtitle}
                      </span>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {hackathon.technologies.split(", ").map((tech, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-white dark:text-opacity-80">
                      {hackathon.achievements.map((achievement, i) => (
                        <li key={i}>
                          <span
                            dangerouslySetInnerHTML={{ __html: achievement }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

Resume.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Resume;
