//src\components\Header.jsx
import React, { useEffect, useState } from "react";
import MoonIcon from "./icons/MoonIcon";
import IconSun from "./icons/IconSun";

const initialStateDarkMode = localStorage.getItem("theme") === "dark";

const Header = () => {
  const [darkmode, setDarkmode] = useState(initialStateDarkMode);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkmode]);

  return (
    <header className="container mx-auto px-4 pt-8 md:max-w-xl">
      <div className="flex justify-between">
        <h1 className="uppercase text-white text-3xl font-semibold tracking-[1rem] ">
          Todo
        </h1>
        <button onClick={() => setDarkmode(!darkmode)}>
          {darkmode ? <IconSun /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
