import BurgerMenu from "./burgerMenu";
import { useState } from "react";
import "../../assets/styles/NavigationMenu.css";
import NavigationLinks from "./NavigationLinks";

const NavigationMenu = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const navLink = NavigationLinks();

  const toggleBurgerMenu = () => {
    setIsBurgerOpen((prev) => !prev);
  };
  return (
    <div className="bg-gray-900 text-white fixed top-0 left-0 w-full z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex py-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold mr-7">Legion</h1>
            <nav className="hidden md:flex w-full justify-between items-center gap-5 sm:ml-6">
              <div className="flex gap-7">{navLink.left}</div>
              <div className="flex gap-5">{navLink.right}</div>
            </nav>
          </div>

          <button
            onClick={toggleBurgerMenu}
            className="md:hidden flex relative w-10 h-10 items-center flex-col justify-center group"
          >
            <span
              className={`absolute h-0.5 w-8 bg-white transition-transform duration-300 ease-in-out ${
                isBurgerOpen ? "rotate-45 translate-y-0.2" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-8 bg-white transition-opacity duration-300 ${
                isBurgerOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-8 bg-white transition-transform duration-300 ease-in-out ${
                isBurgerOpen ? "-rotate-45 -translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </button>
        </div>
      </div>
      <BurgerMenu isOpen={isBurgerOpen} toggleMenu={toggleBurgerMenu} />
    </div>
  );
};

export default NavigationMenu;
