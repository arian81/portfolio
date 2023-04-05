import { useState, useEffect } from "react";
import Image from "next/image";

export default function LightDarkButton() {
  const [iconIdx, setIconIdx] = useState(1);
  const icons = [
    {
      src: "images/dark.svg",
      alt: "light mode sun",
      theme: "dark",
    },
    {
      src: "images/light.svg",
      alt: "dark mode moon",
      theme: "",
    },
    {
      src: "images/dark-auto.svg",
      alt: "auto mode sun",
      theme: "dark",
    },
    {
      src: "images/light-auto.svg",
      alt: "auto mode moon",
      theme: "",
    },
  ];

  function toggleTheme() {
    const iconIdx = parseInt(localStorage.iconIdx);
    let isLightAuto =
      iconIdx === 1 &&
      !window.matchMedia("(prefers-color-scheme: dark)").matches
        ? 1
        : 0;

    const iconIdxTemp =
      iconIdx == 2 || iconIdx == 3 ? 0 : iconIdx + 1 + isLightAuto;

    if (icons[iconIdxTemp]?.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.iconIdx = iconIdxTemp.toString();
    setIconIdx(iconIdxTemp);
  }

  useEffect(() => {
    localStorage.iconIdx = localStorage.iconIdx
      ? (parseInt(localStorage.iconIdx) - 1 + 3) % 3
      : 1;
    toggleTheme();
  }, []);

  return (
    <button id="theme-button" className="w-full" onClick={toggleTheme}>
      <Image
        src={icons[iconIdx]?.src ?? " "}
        alt={icons[iconIdx]?.alt ?? ""}
        width="48"
        height="48"
        priority={true}
      />
    </button>
  );
}
