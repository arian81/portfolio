interface ResumeSkillSectionProps {
  title: string;
  skills: string;
}

const ResumeSkillSection = ({ title, skills }: ResumeSkillSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold dark:text-orange-200 dark:text-opacity-80">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-white dark:text-opacity-90">
        {skills}
      </p>
    </div>
  );
};

export default ResumeSkillSection;
