import Info from "./Info";
import Logo from "../logos/LogoIcon";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <div className="flex justify-between">
      <div className="w-8 dark:text-orange-200 dark:opacity-80 md:w-12">
        <a
          aria-label="Arian Ahmadinejad Logo"
          href="./"
          className="text-[#592406] dark:text-orange-200 dark:opacity-80"
        >
          <Logo className="stroke-[#592406] dark:stroke-orange-200 dark:opacity-80" />
        </a>
      </div>
      <Info />
      <div className="w-10 md:w-12">
        <ThemeToggle />
      </div>
    </div>
  );
}
