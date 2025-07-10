import Link from "next/link";
import { type ReactElement, useState } from "react";
import CustomHead from "~/components/CustomHead";
import LastFm from "~/components/LastFM";
import Layout from "~/components/Layout";
import Socials from "~/components/Socials";
import Whoai from "~/components/Whoai";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const [hideSocials, setHideSocials] = useState<boolean>(false);

  return (
    <>
      <CustomHead />
      <div className="m-auto flex items-center justify-center">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-auto flex-col items-center justify-center gap-10">
            <Whoai propogateFocus={[hideSocials, setHideSocials]} />
            {hideSocials ? null : (
              <>
                <Socials />
                <Link
                  className="btn btn-outline btn-lg rounded-full border-[3px] border-[#592407] text-[#592407] hover:border-transparent hover:bg-[#592407] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
                  href="/resume"
                >
                  Resume
                </Link>
              </>
            )}
            <div className="absolute bottom-0 right-0 z-10 w-full md:w-fit md:p-4">
              <LastFm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
