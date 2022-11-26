import { useEffect, useState } from "react";
import { useLastFM } from "use-last-fm";
const CurrentlyPlaying = () => {
    const lastFM = useLastFM("arian1381", "c1fdc91bc673400065f577a8bed146ed");
    const [ready, setReady] = useState<boolean>(false);

    // set ready to true after 2 seconds using a useeffect
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2000);
    }, []);

    if (lastFM.status !== "playing" || !ready) {
        return (
            <a
                href="#"
                className="opacity-0 -translate-y-[35%]"
                aria-label="void"
            ></a>
        );
    }

    return (
        <a
            href={lastFM.song.url}
            className="transition overflow-hidden flex h-[7rem] wp-full md:w-[20rem] gap-4 md:pr-8 bg-orange-200 dark:bg-[#161616] dark:md:text-inherit dark:md:bg-[rgba(255,241,215,0.8)] dark:text-white md:bg-[#FFF1DF] p-4 md:rounded-[4rem_1rem_1rem_4rem] shadow-[rgba(0,0,0,0.2)_0.4rem_0.4rem]"
        >
            <div className="h-full overflow-hidden rounded-full aspect-square animate-spinDJ">
                <img
                    src={lastFM.song.art ? lastFM.song.art : "/record.webp"}
                    className="w-full h-full aspect-square"
                    alt="album art"
                    width={80}
                    height={80}
                ></img>
            </div>
            <div className="flex-1 flex flex-col items-start justify-center w-[calc(100%-7rem)]">
                <p className="text-sm">Listening to </p>
                <p className="w-full pb-1 overflow-hidden text-2xl font-bold leading-5 text-ellipsis whitespace-nowrap">
                    {lastFM.song.name}
                </p>
                <span className="w-full overflow-hidden text-lg leading-5 text-ellipsis whitespace-nowrap">
                    {lastFM.song.artist} - {lastFM.song.album}
                </span>
            </div>
        </a>
    );
};

export default CurrentlyPlaying;
