import type { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

const ResumeSection = ({ title, children }: ResumeSectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-[#592407] dark:text-orange-200 dark:text-opacity-80">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default ResumeSection;
