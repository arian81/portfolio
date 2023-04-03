import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Whoami: React.FC = () => {
  const [q, setQ] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { mutate, isLoading, isError, data, isSuccess } = useMutation({
    mutationFn: (question: string) => {
      return fetch("https://who-ai-production.up.railway.app/whoai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      }).then((res) => res.text());
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: </div>;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <input
          type="text"
          className={`input input-bordered  transition-all duration-300 ease-in-out  rounded-full md:input-lg input-md ${
            isFocused ? "w-[23em] md:w-[35em] lg:w-[55em]" : "w-[19.5em]"
          } placeholder:text-[14px] md:placeholder:text-lg shadow-lg`}
          placeholder={"What do you want to know about me"}
          value={q}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQ(e.target.value)}
        />
        {/* <button
          className="rounded-full shadow-lg bg-accent btn btn-square btn-md md:btn-lg hover:bg-[#ad653d] border-transparent hover:border-transparent"
          onClick={() => mutate(q)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            className="p-2"
          >
            <path
              fill="currentColor"
              d="M19 8h1v1h-1V8m1-3h-1v2h1V6h.5c.28 0 .5-.22.5-.5v-2c0-.28-.22-.5-.5-.5H18v1h2v1m-3-2h-1v4h1V3m-3.5 12.5a2 2 0 1 0 4 0c0-1.11-.89-2-2-2s-2 .9-2 2M17 8h-1v1h1V8m5 6h-1c0-1.5-.47-2.87-1.26-4h-2.77c1.22.91 2.03 2.36 2.03 4v2h2v1h-2v3H5v-3H3v-1h2v-2c0-2.76 2.24-5 5-5h4c.34 0 .68.04 1 .1V7.08c-.33-.05-.66-.08-1-.08h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-13.5-.5c-1.1 0-2 .9-2 2s.9 2 2 2s2-.89 2-2s-.89-2-2-2Z"
            />
          </svg>
        </button> */}
        <button className="btn btn-accent btn-outline btn-lg btn-square p-2 rounded-full border-[4px] dark:text-[#ccc] dark:border-[#ccc] dark:hover:bg-[#ccc] dark:hover:text-black dark:hover:border-[#ccc]">
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
      {isSuccess && <div>Response: {data}</div>}
    </>
  );
};

export default Whoami;
