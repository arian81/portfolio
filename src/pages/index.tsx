import { type NextPage } from "next";

import Header from "~/components/Header";
import Whoai from "~/components/Whoai";
import Socials from "~/components/Socials";
import LastFm from "~/components/LastFM";
import Copyright from "~/components/Copyright";
import Test from "~/components/TypeWrite";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

const Home: NextPage = () => {
  const [hideSocials, setHideSocials] = useState<boolean>(false);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      <main className="relative min-h-screen w-full bg-orange-200 dark:bg-[#161616]">
        <div
          className="m-auto flex min-h-screen w-auto flex-col items-center justify-center gap-10 pb-24 pt-48"
          ref={parent}
        >
          <div className="absolute top-0 w-full p-2">
            <Header />
          </div>
          <Whoai propogateFocus={setHideSocials} />
          {hideSocials ? null : (
            <>
              <Socials />
              <a
                className="btn-outline btn-accent btn-lg btn rounded-full border-[3px] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
                href="resume.pdf"
              >
                Resume
              </a>
            </>
          )}

          <div className="absolute bottom-0 right-0 z-10 w-full md:w-fit md:p-4">
            <LastFm />
          </div>
          <Copyright />
        </div>
      </main>
    </>
  );
};

export default Home;
