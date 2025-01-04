import { useEffect } from "react";
import { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingData from "../lotties/loading.json";

export default function RandomLeetCode() {
  const router = useRouter();

  useEffect(() => {
    const fetchRandomProblem = async () => {
      try {
        const response = await fetch("/api/lc");
        const data = await response.json();

        if (data.url) {
          // Redirect to the LeetCode problem
          window.location.href = data.url;
        }
      } catch (error) {
        console.error("Error fetching random problem:", error);
      }
    };

    fetchRandomProblem();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="pointer-events-none flex flex-col items-center justify-center">
        <Player autoplay loop src={loadingData} />
      </div>
    </div>
  );
}
