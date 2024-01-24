import light404data from "../lotties/404_light.json";
import dark404data from "../lotties/404_dark.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "~/components/Layout";

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <div className="m-auto flex items-center justify-center">
      <div className="pointer-events-none flex flex-col items-center justify-center">
        <div className="dark:hidden">
          <Player autoplay loop src={light404data} />
        </div>
        <div className="hidden dark:block">
          <Player autoplay loop src={dark404data} />
        </div>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotFoundPage;
