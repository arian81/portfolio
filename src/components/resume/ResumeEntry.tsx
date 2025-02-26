import { ReactNode } from "react";

interface ResumeEntryProps {
  title: string;
  organization?: string;
  organizationUrl?: string;
  date?: string;
  location?: string;
  technologies?: string;
  children: ReactNode;
}

const ResumeEntry = ({
  title,
  organization,
  organizationUrl,
  date,
  location,
  technologies,
  children,
}: ResumeEntryProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col justify-between md:flex-row">
        <h3 className="text-xl font-semibold dark:text-orange-200 dark:text-opacity-80">
          {organizationUrl ? (
            <a
              href={organizationUrl}
              className="hover:text-[#592407] dark:text-orange-200 dark:text-opacity-80 dark:hover:text-orange-200 dark:hover:text-opacity-100"
            >
              {title}
            </a>
          ) : (
            title
          )}
          {organization && ` | ${organization}`}
        </h3>
        {date && (
          <span className="text-gray-600 dark:text-white dark:text-opacity-90">
            {date}
          </span>
        )}
      </div>
      {(technologies || location) && (
        <p className="text-gray-600 dark:text-white dark:text-opacity-90">
          {organizationUrl && (
            <>
              <a
                href={organizationUrl}
                className="hover:text-[#592407] dark:text-orange-200 dark:text-opacity-80 dark:hover:text-orange-200 dark:hover:text-opacity-100"
              >
                {organization}
              </a>{" "}
              |{" "}
            </>
          )}
          {technologies}
          {location && ` | ${location}`}
        </p>
      )}
      <ul className="mt-2 list-disc pl-5">{children}</ul>
    </div>
  );
};

export default ResumeEntry;
