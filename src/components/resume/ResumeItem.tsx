import { ReactNode } from "react";

interface ResumeItemProps {
  children: ReactNode;
}

const ResumeItem = ({ children }: ResumeItemProps) => {
  return <li className="dark:text-white dark:text-opacity-90">{children}</li>;
};

export default ResumeItem;
