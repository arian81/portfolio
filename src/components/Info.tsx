import TypeWriter from "./TypeWrite";

export default function Info() {
  return (
    <div className="flex gap-5">
      <div className="w-fit rounded-full border-4 border-[#592406] dark:border-orange-200 dark:opacity-80"></div>
      <div className="flex flex-col justify-center">
        <h1 className="text-md font-bold text-black dark:text-[#ccc] md:text-2xl">
          Arian Ahmadinejad
        </h1>
        <h2 className="text-sm text-black dark:text-[#ccc]">
          <TypeWriter
            data={[
              "Machine Learning Intern",
              "CS Student",
              "Open Source Enthusiast",
              "Software Developer",
            ]}
            breakLine={false}
            loop={false}
            speed={150}
          />
        </h2>
      </div>
    </div>
  );
}
