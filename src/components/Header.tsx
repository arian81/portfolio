import Info from "./Info";
import Logo from "../logos/LogoIcon";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/router";
import { clsx } from "clsx";

export default function Header() {
  const router = useRouter();
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="w-8 dark:text-orange-200 dark:opacity-80 md:w-12">
          <Link
            aria-label="Arian Ahmadinejad Logo"
            href="/"
            className="text-[#592406] dark:text-orange-200 dark:opacity-80"
          >
            <Logo className="stroke-[#592406] dark:stroke-orange-200 dark:opacity-80" />
          </Link>
        </div>
        <div role="tablist" className="tabs tabs-bordered tabs-sm md:tabs-lg ">
          <Link
            href="/projects"
            role="tab"
            className={clsx(
              "tab transition-all dark:!border-orange-200 dark:text-orange-200 dark:text-opacity-80  md:hover:border-b-4 md:hover:px-4",
              router.route === "/projects"
                ? "tab-active dark:!border-opacity-100"
                : "dark:!border-opacity-30",
            )}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            role="tab"
            className={clsx(
              "tab transition-all dark:!border-orange-200 dark:text-orange-200 dark:text-opacity-80  md:hover:border-b-4 md:hover:px-4",
              router.route === "/blog"
                ? "tab-active dark:!border-opacity-100"
                : "dark:!border-opacity-30",
            )}
          >
            Blog
          </Link>
          <Link
            href="/whoami"
            role="tab"
            className={clsx(
              "tab transition-all dark:!border-orange-200 dark:text-orange-200 dark:text-opacity-80  md:hover:border-b-4 md:hover:px-4",
              router.route === "/whoami"
                ? "tab-active dark:!border-opacity-100"
                : "dark:!border-opacity-30",
            )}
          >
            whoami
          </Link>
        </div>
        <div className="w-10 md:w-12">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
