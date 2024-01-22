import light404data from "../lotties/404_light.json";
import dark404data from "../lotties/404_dark.json";
import Header from "~/components/Header";
import Copyright from "~/components/Footer";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Custom404() {
  return (
    // <main className="relative min-h-screen w-full bg-orange-200 dark:bg-[#161616]">
    //   <div className="m-auto flex min-h-screen w-auto flex-col items-center justify-center gap-10 pb-24 pt-48">
    //     <div className="absolute top-0 w-full p-2">
    //       <Header />
    //     </div>

    //     <Copyright />
    //   </div>
    // </main>
    <div>
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
}
