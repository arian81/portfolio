import Image from "next/image";
import React, { ReactElement } from "react";
import Layout from "~/components/Layout";
import { Inconsolata, Noto_Emoji } from "next/font/google";
import { Icon } from "@iconify-icon/react";

const inconsolata = Inconsolata({ subsets: ["latin"] });
const emoji = Noto_Emoji({ subsets: ["emoji"] });

const About = () => {
  return (
    <div className="m-auto flex h-full w-full items-start justify-center gap-5">
      <Image
        src="/images/profile.svg"
        alt="Arian Ahmadinejad"
        width={300}
        height={300}
        className="rounded-3xl bg-[#FFF1DF] outline outline-4 outline-black"
      ></Image>
      <div className={inconsolata.className}>
        <h1 className="text-5xl font-bold dark:text-[#CCC]">
          Arian Ahmadinejad
        </h1>
        <p className="pt-5 text-lg dark:text-[#CCC]">
          I'm a{" "}
          <span
            className="tooltip underline"
            data-tip="I've been on co-op for the
          past year after I finished 2nd year"
          >
            2.5 year
          </span>{" "}
          <span className={emoji.className}>🎓</span>computer science student
          from <span className={emoji.className}>🏫</span>McMaster University.{" "}
          <br></br> I Play with my balls everyday.
        </p>
      </div>
    </div>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
