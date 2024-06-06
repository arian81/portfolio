import Whoai from "~/components/Whoai";
import Socials from "~/components/Socials";
import LastFm from "~/components/LastFM";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/Layout";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  const [hideSocials, setHideSocials] = useState<boolean>(false);

  return (
    <div className="m-auto flex items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        <div className=" flex w-auto flex-col items-center justify-center gap-10">
          <Whoai propogateFocus={[hideSocials, setHideSocials]} />
          {hideSocials ? null : (
            <>
              <Socials />
              <Link
                className="btn btn-outline btn-lg rounded-full border-[3px] border-[#592407] text-[#592407] hover:border-transparent hover:bg-[#592407] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
                href="resume.pdf"
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
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
