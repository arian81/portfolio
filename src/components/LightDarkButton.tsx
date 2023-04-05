import { useState, useEffect } from "react";
import Image from "next/image";

const cycleIcons = (iconIdx: number) => {
  let isLightAuto =
    iconIdx === 1 && !window.matchMedia("(prefers-color-scheme: dark)").matches
      ? 1
      : 0;
  return iconIdx === 2 || iconIdx === 3 ? 0 : iconIdx + 1 + isLightAuto;
};

export default function LightDarkButton() {
  const [iconIdx, setIconIdx] = useState(1);
  const icons = [
    {
      src: "images/dark.svg",
      alt: "dark mode moon",
      theme: "dark",
    },
    {
      src: "images/light.svg",
      alt: "light mode sun",
      theme: "",
    },
    {
      src: "images/dark-auto.svg",
      alt: "auto mode moon",
      theme: "dark",
    },
    {
      src: "images/light-auto.svg",
      alt: "auto mode sun",
      theme: "",
    },
  ];

  function toggleTheme() {
    const iconIdxTemp = localStorage.iconIdx
      ? cycleIcons(parseInt(localStorage.iconIdx))
      : iconIdx;

    if (icons[iconIdxTemp]?.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.iconIdx = iconIdxTemp.toString();
    setIconIdx(iconIdxTemp);
  }

  useEffect(() => {
    const iconIdxTemp = parseInt(localStorage.iconIdx);
    if (!localStorage) {
      return;
    }
    if (localStorage.iconIdx) {
      localStorage.iconIdx = (
        (iconIdxTemp + 3 + (iconIdxTemp === 3 ? 3 : 0)) %
        4
      ).toString();
    } else {
      localStorage.iconIdx = iconIdx.toString();
    }
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
