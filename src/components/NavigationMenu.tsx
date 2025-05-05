import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import BurgerMenu from "./ui/burgerMenu";
import { useState } from "react";
import "../assets/styles/StylesRouterPages/NavigationMenu.css";

const NavigationMenu = () => {
  const { isAuthenticated, logout, userRole } = useUserStore();
  const roleAdmin = userRole.some((role) => role.role === "ADMIN");
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen((prev) => !prev);
  };
  return (
    <div className="bg-gray-900 text-white fixed top-0 left-0 w-full z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-around py-6">
          <div className="flex items-center sm:items-stretch sm:justify-start">
            <div className="mr-7">
              <h1 className="text-2xl font-bold">Legion</h1>
            </div>
            <div className="hidden md:flex items-center justify-center sm:ml-6">
              <div className="flex items-center justify-center space-x-7">
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>

                <Link to="#" className="text-gray-300 hover:text-white">
                  About
                </Link>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Services
                </Link>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          {roleAdmin && (
            <Link
              to="/adminPanel"
              className="admin flex items-center gap-3 text-gray-300 hover:text-white"
            >
              Admin Panel
            </Link>
          )}

          {!isAuthenticated ? (
            <div className="hidden md:flex relative items-center gap-5">
              <Link to="/auth/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/auth/reg" className="text-gray-300 hover:text-white">
                Registration
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex relative items-center gap-5">
              <button
                onClick={logout}
                className="logout flex items-center gap-3 text-gray-300 hover:text-white"
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="profile flex items-center gap-3 text-gray-300 hover:text-white"
              >
                Profile
              </Link>
            </div>
          )}
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
