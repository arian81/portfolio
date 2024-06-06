import Image from "next/image";
import React, { ReactElement } from "react";
import Layout from "~/components/Layout";
import { Inconsolata, Noto_Emoji } from "next/font/google";
import BellIcon from "~/logos/BellIcon";
import ProfileIcon from "~/logos/ProfileIcon";

const inconsolata = Inconsolata({ subsets: ["latin"] });
const emoji = Noto_Emoji({ subsets: ["emoji"] });

const About = () => {
  return (
    <>
      <div
        className={
          inconsolata.className +
          " flex h-full w-full flex-col gap-5  px-10 pt-20 md:flex-row  md:items-start lg:m-auto lg:flex-row lg:items-center lg:justify-center"
        }
      >
        <div className="relative hidden aspect-square w-24 lg:block lg:w-64">
          <ProfileIcon className="rounded-xl bg-[#FFF1DF]" />
        </div>
        <div className="">
          <div className="flex gap-4">
            <div className="relative aspect-square w-24 lg:hidden lg:w-64">
              <ProfileIcon className="rounded-xl bg-[#FFF1DF]" />
            </div>
            <h1 className="flex flex-col text-lg font-bold dark:text-[#CCC] lg:flex-row">
              <div className="text-5xl">Arian</div>
              <span className="hidden lg:block">&nbsp;</span>
              <div className="text-2xl lg:text-5xl"> Ahmadinejad</div>
            </h1>
          </div>
          <div className="flex flex-col gap-5  pt-10 text-lg  dark:text-white">
            <div>
              I'm a{" "}
              <span
                className="tooltip underline"
                data-tip="I've been on co-op for the
      past year after I finished 2nd year"
              >
                2.5 year
              </span>{" "}
              <span className={emoji.className}>🎓</span>computer science
              student from <span className={emoji.className}>🏫</span>McMaster
              University.{" "}
            </div>
            <div className="">
              <span>
                Working as a software engineer on generative ai products @{" "}
                <BellIcon className="inline-block h-7 w-7 text-black dark:text-[#CCC] lg:h-12 lg:w-12" />
              </span>
              {/* <span className="ml-5">.</span> */}
            </div>
            <div>
              I love riding <span className={emoji.className}>🚴</span>bikes
              after a full day of work as it lets me clear my head and relax.
              <br></br>
              Currently learning <span className={emoji.className}>🦀</span>Rust
              and how to make a{" "}
              <a href="https://craftinginterpreters.com/" className="underline">
                programming language.
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
