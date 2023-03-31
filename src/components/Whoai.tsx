import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Whoami: React.FC = () => {
  const [q, setQ] = useState("");

  const { mutate, isLoading, isError, data, isSuccess } = useMutation({
    mutationFn: (question: string) => {
      return fetch("https://who-ai-production.up.railway.app/whoai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://arian.gg",
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
      <input type="text" onChange={(e) => setQ(e.target.value)} value={q} />
      <button onClick={() => mutate(q)}>Ask</button>
      {isSuccess && <div>Response: {data}</div>}
    </>
  );
};

export default Whoami;
