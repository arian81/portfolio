import Info from "./Info";
import Logo from "../logos/LogoIcon";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
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
        {/* <Info /> */}
        <div className="join">
          <Link
            href="/projects"
            className="btn btn-outline join-item w-24 rounded-l-full border-[3px] border-[#592407] text-[#592407] hover:border-transparent hover:bg-[#592407] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="btn btn-outline join-item w-24 rounded-l-full border-[3px] border-x-0 border-[#592407] text-[#592407] hover:border-transparent hover:bg-[#592407] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
          >
            Blog
          </Link>
          <Link
            href="/whoami"
            className="btn btn-outline join-item w-24 rounded-r-full border-[3px] border-[#592407] text-[#592407] hover:border-transparent hover:bg-[#592407] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
          >
            Whoami
          </Link>
        </div>
        <div className="w-10 md:w-12">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
