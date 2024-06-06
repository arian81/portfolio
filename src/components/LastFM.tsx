import { useEffect, useState } from "react";
import { useLastFM } from "use-last-fm";
import { env } from "../env.mjs";
const CurrentlyPlaying = () => {
  const lastFM = useLastFM(
    env.NEXT_PUBLIC_LASTFM_USERNAME,
    env.NEXT_PUBLIC_LASTFM_TOKEN,
  );
  const [ready, setReady] = useState(false);

  // set ready to true after 2 seconds using a useffect
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 2000);
  }, []);

  if (lastFM.status !== "playing" || !ready) {
    return (
      <a
        href="#"
        className="-translate-y-[35%] opacity-0"
        aria-label="void"
      ></a>
    );
  }
  console.log(lastFM.song.url);

  return (
    <a
      href={lastFM.song.url}
      className="wp-full flex h-[7rem] gap-4 overflow-hidden bg-orange-200 p-4 shadow-[rgba(0,0,0,0.2)_0.4rem_0.4rem] transition dark:bg-[#161616] dark:text-white md:w-[20rem] md:rounded-[4rem_1rem_1rem_4rem] md:bg-[#FFF1DF] md:pr-8 dark:md:bg-[rgba(255,241,215,0.8)] dark:md:text-inherit"
    >
      <div className="aspect-square h-full animate-spinDJ overflow-hidden rounded-full">
        <img
          src={lastFM.song.art ? lastFM.song.art : "/assets/record.webp"}
          className="aspect-square h-full w-full"
          alt="album art"
          width={80}
          height={80}
        ></img>
      </div>
      <div className="flex w-[calc(100%-7rem)] flex-1 flex-col items-start justify-center">
        <p className="text-sm">Listening to </p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap pb-1 text-2xl font-bold leading-5">
          {lastFM.song.name}
        </p>
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg leading-5">
          {lastFM.song.artist} - {lastFM.song.album}
        </span>
      </div>
    </a>
  );
};

export default CurrentlyPlaying;
