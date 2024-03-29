const Copyright = () => {
  let start = new Date();
  let year = start.getFullYear().toString();
  return (
    <div className="absolute bottom-0 p-2">
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-[#592406] dark:text-[#ccc] dark:opacity-80">
          Made with ♥ in <a href="https://nextjs.org">Next.js</a>
        </p>
        <p className="text-sm text-[#592406] dark:text-[#ccc] dark:opacity-80">
          © {year} Arian Ahmadinejad
        </p>
      </div>
    </div>
  );
};

export default Copyright;
