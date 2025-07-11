import Link from "next/link";

const Footer = () => {
  const start = new Date();
  const year = start.getFullYear().toString();
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <p className="text-sm text-[#592406] dark:text-[#ccc] dark:opacity-80">
        Made with ♥ in <Link href="https://nextjs.org">Next.js</Link>
      </p>
      <p className="text-sm text-[#592406] dark:text-[#ccc] dark:opacity-80">
        © {year} Arian Ahmadinejad
      </p>
    </div>
  );
};

export default Footer;
