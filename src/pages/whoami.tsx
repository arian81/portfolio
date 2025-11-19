import { Inconsolata, Noto_Emoji } from "next/font/google";
import type { ReactElement } from "react";
import CustomHead from "~/components/CustomHead";
import Layout from "~/components/Layout";
import ProfileIcon from "~/logos/ProfileIcon";

const inconsolata = Inconsolata({ subsets: ["latin"] });
const emoji = Noto_Emoji({ subsets: ["emoji"] });

const About = () => {
  return (
    <>
      <CustomHead />
      <div
        className={
          inconsolata.className +
          " flex h-full w-full flex-col gap-5 px-10 pt-20 md:flex-row md:items-start lg:m-auto lg:flex-row lg:items-center lg:justify-center"
        }
      >
        <div className="relative hidden aspect-square w-24 lg:block lg:w-64">
          <ProfileIcon className="rounded-xl bg-[#FFF1DF]" />
        </div>
        <div>
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
          <ul className="pt-5 text-lg dark:text-white">
            <li className="py-2">
              <span className={emoji.className}>🎓 </span>
              I'm a 4th year computer science student from McMaster University.
            </li>
            <li className="py-2">
              <span className={emoji.className}>🦎 </span>
              Currently a software engineer at Greptile
            </li>
            <li className="py-2">
              <span className={emoji.className}>🚴 </span>I love riding bikes
              after a full day of work as it lets me clear my head and relax.
            </li>
            <li className="py-2">
              <span className={emoji.className}>🔥 </span>
              Currently learning about tensors and pytorch.
            </li>
          </ul>

          {/* <div className="flex flex-col gap-2  pt-10 text-lg  dark:text-white">
            <div>
              <span className={emoji.className}>🎓 </span>
              I'm a{" "}
              <span
                className="tooltip underline"
                data-tip="I've been on co-op for the
      past year after I finished 2nd year"
              >
                2.5 year
              </span>{" "}
              computer science student from McMaster University.
            </div>
            <div>
              <span className={emoji.className}>💼 </span>
              Working as a software engineer on generative ai products at Bell
              Canada.
            </div>
            <div>
              <span className={emoji.className}>🚴 </span>I love riding bikes
              after a full day of work as it lets me clear my head and relax.
            </div>
            <div>
              <span className={emoji.className}>🦀 </span>
              Currently learning Rust and how to make a{" "}
              <a href="https://craftinginterpreters.com/" className="underline">
                programming language.
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
