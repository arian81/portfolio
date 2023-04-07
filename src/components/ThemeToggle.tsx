import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [icon, setIcon] = useState(42);
  const icons = [
    { src: "images/dark-auto.svg", alt: "auto mode moon" },
    {
      src: "images/light-auto.svg",
      alt: "auto mode sun",
    },
    { src: "images/light.svg", alt: "light mode sun" },
    { src: "images/dark.svg", alt: "dark mode moon" },
  ];

  useEffect(() => {
    if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIcon(0);
      } else {
        setIcon(1);
      }
    } else if (theme === "light") {
      setIcon(2);
    } else if (theme === "dark") {
      setIcon(3);
    }

    const handleChange = (event: { matches: any }) => {
      if (theme === "system") {
        if (event.matches) {
          setIcon(0);
        } else {
          setIcon(1);
        }
      }
    };

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", handleChange);

    return () => {
      darkModeQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  function toggleTheme() {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  }
  return (
    <button onClick={toggleTheme} aria-label="change theme">
      {icon !== 42 && (
        <Image
          src={icons[icon]?.src ?? ""}
          alt={icons[icon]?.alt ?? ""}
          width="48"
          height="48"
          priority={true}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
