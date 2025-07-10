import autoAnimate from "@formkit/auto-animate";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import TypeWriter from "./TypeWrite";

interface WhoamiProps {
  propogateFocus: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
const Whoami: React.FC<WhoamiProps> = ({ propogateFocus }) => {
  const [q, setQ] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const parent = useRef(null);
  const [showResult, setShowResult] = useState(true);

  const { mutate, isPending, data, isSuccess, reset } = useMutation({
    mutationFn: (question: string) => {
      return fetch("https://whoai.arian.gg/", {
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
  }, []);

  useEffect(() => {
    if (propogateFocus[0] === false) {
      reset();
    }
  }, [propogateFocus[0], reset]);

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-12",
        isPending && "animate-pulse",
      )}
      ref={parent}
    >
      {
        <div>
          <div
            className={clsx(
              propogateFocus[0] && showResult
                ? "opacity-100 delay-700 duration-700"
                : "opacity-0 duration-150",
              "hidden transition-all dark:text-white lg:block",
            )}
            key={"escape"}
          >
            Press{" "}
            <kbd
              className="kbd kbd-md cursor-pointer bg-neutral-100 dark:text-black"
              onClick={() => propogateFocus[1](false)}
            >
              esc
            </kbd>{" "}
            to go back.
          </div>
          <div
            className={clsx(
              propogateFocus[0] && showResult
                ? "opacity-100 delay-700 duration-700"
                : "opacity-0 duration-150",
              "transition-all dark:text-white lg:hidden",
            )}
            key={"escape-mobile"}
          >
            Press{" "}
            <kbd
              className="kbd kbd-md cursor-pointer text-black"
              onClick={() => propogateFocus[1](false)}
            >
              here
            </kbd>{" "}
            to go back.
          </div>
        </div>
      }
      <div className="flex w-full min-w-[90vw] items-center gap-4 md:min-w-[30em] md:flex-row">
        <input
          type="text"
          className={`input input-md input-bordered rounded-full transition-all duration-300 ease-in-out md:input-lg ${
            isFocused && propogateFocus[0]
              ? "w-[23em] md:w-[35em] lg:w-[45em] xl:w-[55em]"
              : "w-[19.5em]"
          } w-full shadow-lg placeholder:text-[14px] md:placeholder:text-lg`}
          placeholder={"What do you want to know about me"}
          value={q}
          onClick={() => {
            setIsFocused(true);
            propogateFocus[1](true);
            setShowResult(true);
          }}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && q !== "") {
              mutate(q);
            }
            if (e.key === "Escape") {
              (document.activeElement as HTMLElement).blur();
              propogateFocus[1](false);
            }
          }}
        />
        <button
          className={clsx(
            "btn btn-square btn-outline btn-lg rounded-full border-[4px] border-[#592407] p-2 text-[#592407] hover:border-transparent hover:bg-[#592407] dark:border-[#ccc] dark:text-[#ccc] dark:hover:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black",
          )}
          onClick={() => {
            if (q !== "") {
              mutate(q);
            }
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
      {isSuccess && showResult && propogateFocus[0] && (
        <div
          className="flex max-h-96 max-w-3xl flex-col overflow-auto rounded-lg bg-white text-sm font-medium md:text-lg"
          key={"message"}
        >
          <button
            className="btn btn-circle btn-sm ml-3 mt-3 bg-white p-2 text-black hover:bg-black hover:text-white"
            onClick={() => {
              setShowResult(false);
              propogateFocus[1](false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path
                fill="currentColor"
                d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
              />
            </svg>
          </button>
          <div className="px-12 pb-12">
            <TypeWriter data={data} breakLine={true} loop={false} speed={25} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Whoami;
