import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/Layout";
import CustomHead from "~/components/CustomHead";
import Head from "next/head";
import ResumeHeader from "~/components/resume/ResumeHeader";
import ResumeSection from "~/components/resume/ResumeSection";
import ResumeEntry from "~/components/resume/ResumeEntry";
import ResumeItem from "~/components/resume/ResumeItem";
import ResumeSkillSection from "~/components/resume/ResumeSkillSection";
import DownloadButton from "~/components/resume/DownloadButton";
import {
  personalInfo,
  education,
  experience,
  projects,
  hackathons,
  skills,
} from "~/data/resumeData";

const Resume: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Arian Ahmadinejad | Resume</title>
        <meta name="description" content="Arian Ahmadinejad's Resume" />
      </Head>
      <CustomHead />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Sticky Download Button */}
        <DownloadButton
          href="/resume.pdf"
          text="Download PDF"
          isSticky={true}
        />

        {/* Header */}
        <ResumeHeader
          name={personalInfo.name}
          title={personalInfo.title}
          email={personalInfo.email}
          website={personalInfo.website}
          github={personalInfo.github}
          linkedin={personalInfo.linkedin}
        />

        {/* Education */}
        <ResumeSection title="Education">
          {education.map((edu, index) => (
            <ResumeEntry key={index} title={edu.school} date={edu.date}>
              <p className="mb-2 text-gray-600 dark:text-white dark:text-opacity-90">
                {edu.degree} | GPA: {edu.gpa}
              </p>
              {edu.achievements.map((achievement, i) => (
                <ResumeItem key={i}>{achievement}</ResumeItem>
              ))}
            </ResumeEntry>
          ))}
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Experience">
          {experience.map((exp, index) => (
            <ResumeEntry
              key={index}
              title={exp.title}
              organization={exp.organization}
              organizationUrl={exp.organizationUrl}
              date={exp.date}
              location={exp.location}
              technologies={exp.technologies}
            >
              {exp.achievements.map((achievement, i) => (
                <ResumeItem key={i}>
                  <span dangerouslySetInnerHTML={{ __html: achievement }} />
                </ResumeItem>
              ))}
            </ResumeEntry>
          ))}
        </ResumeSection>

        {/* Projects */}
        <ResumeSection title="Projects">
          {projects.map((project, index) => (
            <ResumeEntry
              key={index}
              title={project.title}
              organization={project.subtitle}
              organizationUrl={project.url}
              technologies={project.technologies}
            >
              {project.achievements.map((achievement, i) => (
                <ResumeItem key={i}>
                  <span dangerouslySetInnerHTML={{ __html: achievement }} />
                </ResumeItem>
              ))}
            </ResumeEntry>
          ))}
        </ResumeSection>

        {/* Hackathons */}
        <ResumeSection title="Hackathons">
          {hackathons.map((hackathon, index) => (
            <ResumeEntry
              key={index}
              title={hackathon.title}
              organization={`${hackathon.subtitle} | ${hackathon.event}`}
              organizationUrl={hackathon.url}
              technologies={hackathon.technologies}
            >
              {hackathon.achievements.map((achievement, i) => (
                <ResumeItem key={i}>
                  <span dangerouslySetInnerHTML={{ __html: achievement }} />
                </ResumeItem>
              ))}
            </ResumeEntry>
          ))}
        </ResumeSection>

        {/* Skills */}
        <ResumeSection title="Skills">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {skills.map((skill, index) => (
              <ResumeSkillSection
                key={index}
                title={skill.category}
                skills={skill.items}
              />
            ))}
          </div>
        </ResumeSection>
      </div>
    </>
  );
};

Resume.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Resume;
