import Lottie from "react-lottie";
import light404data from "../lotties/404_light.json";
import dark404data from "../lotties/404_dark.json";
import Header from "~/components/Header";
import Copyright from "~/components/Copyright";
export default function Custom404() {
  const light404 = {
    loop: true,
    autoplay: true,
    animationData: light404data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dark404 = {
    loop: true,
    autoplay: true,
    animationData: dark404data,
  };
  return (
    //     <div class="flex flex-col items-center justify-center w-full h-full">
    //   <div class="dark:hidden">
    //     {/* <lottie-player
    //       src="/404_light.json"
    //       background="transparent"
    //       speed="0.3"
    //       style="width: full; height: full "
    //       loop
    //       autoplay></lottie-player> */}
    //       <Lottie options={light404} height={400} width={400} />
    //   </div>
    //   <div class="hidden dark:block">
    //     {/* <lottie-player
    //       src="/404_dark.json"
    //       background="transparent"
    //       speed="0.3"
    //       style="width: full; height: full "
    //       loop
    //       autoplay></lottie-player> */}
    //     <Lottie options={dark404} height={400} width={400} />
    //   </div>
    //   <div>
    //     <p
    //       class="text-[#592406] text-xl md:text-4xl font-bold dark:text-white opacity-80"
    //     >
    //       This page doesn't exist (yet?)
    //     </p>
    //     <div class="flex items-center justify-center p-5">
    //       <div
    //         class="w-10 md:w-16 text- dark:text-orange-200 dark:opacity-80 text-[#592406]"
    //       >
    //         <a href="/"><HomeIcon /></a>
    //       </div>
    // <div/>
    <main className="relative min-h-screen w-full bg-orange-200 dark:bg-[#161616]">
      <div className="m-auto flex min-h-screen w-auto flex-col items-center justify-center gap-10 pb-24 pt-48">
        <div className="absolute top-0 w-full p-2">
          <Header />
        </div>
        <div className="pointer-events-none flex flex-col items-center justify-center">
          <div className="dark:hidden">
            <Lottie options={light404} height={400} width={700} />
          </div>
          <div className="hidden dark:block">
            <Lottie options={dark404} height={400} width={700} />{" "}
          </div>
        </div>
        <Copyright />
      </div>
    </main>
  );
}
