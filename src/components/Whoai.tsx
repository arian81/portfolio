import autoAnimate from "@formkit/auto-animate";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import TypeWriter from "./TypeWrite";

const Whoami: React.FC = () => {
  const [q, setQ] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const parent = useRef(null);

  const { mutate, isLoading, isError, data, isIdle, isSuccess } = useMutation({
    mutationFn: (question: string) => {
      return fetch("https://whoai.arian.gg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      }).then((res) => res.text());
    },
  });

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center gap-4 p-4",
          isLoading && "animate-pulse"
        )}
        ref={parent}
      >
        <div className="flex w-full min-w-[90vw] flex-col items-center gap-4 md:min-w-[30em] md:flex-row">
          <input
            type="text"
            className={`input-bordered input  input-md rounded-full transition-all  duration-300 ease-in-out md:input-lg ${
              isFocused
                ? "w-[23em] md:w-[35em] lg:w-[45em] xl:w-[55em]"
                : "w-[19.5em]"
            } w-full shadow-lg placeholder:text-[14px] md:placeholder:text-lg`}
            placeholder={"What do you want to know about me"}
            value={q}
            onFocus={() => {
              setIsFocused(true);
            }}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && mutate(q)}
          />
          <button
            className={clsx(
              "btn-outline btn-accent btn-square btn-lg btn rounded-full border-[4px] p-2 dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black"
            )}
            onClick={() => {
              mutate(q);
            }}
            aria-label="Submit question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 8h1v1h-1V8m1-3h-1v2h1V6h.5c.28 0 .5-.22.5-.5v-2c0-.28-.22-.5-.5-.5H18v1h2v1m-3-2h-1v4h1V3m-3.5 12.5a2 2 0 1 0 4 0c0-1.11-.89-2-2-2s-2 .9-2 2M17 8h-1v1h1V8m5 6h-1c0-1.5-.47-2.87-1.26-4h-2.77c1.22.91 2.03 2.36 2.03 4v2h2v1h-2v3H5v-3H3v-1h2v-2c0-2.76 2.24-5 5-5h4c.34 0 .68.04 1 .1V7.08c-.33-.05-.66-.08-1-.08h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-13.5-.5c-1.1 0-2 .9-2 2s.9 2 2 2s2-.89 2-2s-.89-2-2-2Z"
              />
            </svg>
          </button>
        </div>
        {(isSuccess || (isIdle && data)) && (
          <div className="max-w-3xl dark:text-white">
            <TypeWriter data={data} breakLine={true} loop={false} speed={25} />
          </div>
        )}
      </div>
    </>
  );
};

export default Whoami;
