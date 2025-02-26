import Link from "next/link";

interface DownloadButtonProps {
  href: string;
  text: string;
  isSticky?: boolean;
}

const DownloadButton = ({
  href,
  text,
  isSticky = false,
}: DownloadButtonProps) => {
  return (
    <div
      className={`${isSticky ? "fixed bottom-6 right-6 z-50" : "mt-8 flex justify-center"}`}
    >
      <Link
        href={href}
        className="btn btn-outline btn-lg rounded-full border-[3px] border-[#592407] px-6 py-2 text-[#592407] shadow-lg transition-colors hover:border-transparent hover:bg-[#592407] hover:text-white dark:border-orange-200 dark:border-opacity-80 dark:text-white dark:text-opacity-90 dark:hover:border-orange-200 dark:hover:border-opacity-100 dark:hover:bg-orange-200 dark:hover:bg-opacity-80 dark:hover:text-black"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </Link>
    </div>
  );
};

export default DownloadButton;
