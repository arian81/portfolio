import Image from "next/image";
import React, { ReactElement } from "react";
import Layout from "~/components/Layout";
import { Inconsolata, Noto_Emoji } from "next/font/google";
import BellIcon from "~/logos/BellIcon";

const inconsolata = Inconsolata({ subsets: ["latin"] });
const emoji = Noto_Emoji({ subsets: ["emoji"] });

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5 m-auto md:flex-row md:items-start">
      <Image
        src="/images/profile.svg"
        alt="Arian Ahmadinejad"
        width={300}
        height={300}
        sizes="100vw"
        className="rounded-3xl bg-[#FFF1DF] outline outline-4 outline-black"
      ></Image>
      <div className={inconsolata.className}>
        <h1 className="text-5xl font-bold dark:text-[#CCC]">
          Arian Ahmadinejad
        </h1>
        <p className="pt-5 text-lg dark:text-[#CCC] ">
          I'm a{" "}
          <span
            className="underline tooltip"
            data-tip="I've been on co-op for the
          past year after I finished 2nd year"
          >
            2.5 year
          </span>{" "}
          <span className={emoji.className}>🎓</span>computer science student
          from <span className={emoji.className}>🏫</span>McMaster University.{" "}
          <br></br>
          <div className="flex">
            Working as a software engineer on generative ai products @{" "}
            <BellIcon className="text-black dark:text-[#CCC]" />
            <span className="ml-5">.</span>
          </div>
          I love riding <span className={emoji.className}>🚴</span>bikes after a
          full day of work as it lets me clear my head and relax.<br></br>
          Currently learning <span className={emoji.className}>🦀</span>Rust and
          how to make a{" "}
          <a href="https://craftinginterpreters.com/" className="underline">
            programming language
          </a>
          .
        </p>
      </div>
    </div>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
