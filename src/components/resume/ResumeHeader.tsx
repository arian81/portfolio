interface ResumeHeaderProps {
  name: string;
  title: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
}

const ResumeHeader = ({
  name,
  title,
  email,
  website,
  github,
  linkedin,
}: ResumeHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col items-center justify-between border-b border-[#592407] pb-4 dark:border-orange-200 dark:border-opacity-80 md:flex-row">
      <div>
        <h1 className="text-4xl font-bold dark:text-orange-200 dark:text-opacity-80">
          {name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-white dark:text-opacity-90">
          {title}
        </p>
      </div>
      <div className="mt-4 flex flex-col space-y-1 text-right md:mt-0">
        <div>
          <a
            href={`mailto:${email}`}
            className="hover:text-[#592407] dark:text-orange-200 dark:text-opacity-80 dark:hover:text-orange-200 dark:hover:text-opacity-100"
          >
            {email}
          </a>
        </div>
        <div>
          <a
            href={website}
            className="hover:text-[#592407] dark:text-orange-200 dark:text-opacity-80 dark:hover:text-orange-200 dark:hover:text-opacity-100"
          >
            {website.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <div>
          <a
            href={github}
            className="hover:text-[#592407] dark:text-orange-200 dark:text-opacity-80 dark:hover:text-orange-200 dark:hover:text-opacity-100"
          >
            {github.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <div>
          <a
            href={linkedin}
            className="hover:text-[#592407] dark:text-orange-200 dark:text-opacity-80 dark:hover:text-orange-200 dark:hover:text-opacity-100"
          >
            {linkedin.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;
