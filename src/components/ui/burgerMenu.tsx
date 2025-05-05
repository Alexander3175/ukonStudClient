import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import "../../assets/styles/StylesRouterPages/NavigationMenu.css";

interface BurgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function BurgerMenu({ isOpen, toggleMenu }: BurgerMenuProps) {
  const { isAuthenticated, logout, userRole } = useUserStore();
  const roleAdmin = userRole.some((role) => role.role === "ADMIN");

  return (
    <div
      className={`${isOpen ? "flex translate-x-0" : "-translate-x-full"} container flex absolute w-[400px] h-screen start-0 top-0 flex-col items-start justify-between p-6  bg-gray-900 transition-transform duration-300 ease-in-out`}
    >
      <h1 className="text-xl font-bold self-center">Legion</h1>

      <nav className="flex flex-col gap-5 items-start justify-center ">
        <Link
          to="/"
          className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
        >
          Home
        </Link>

        <Link
          to="#"
          className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
        >
          About
        </Link>
        <Link
          to="#"
          className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
        >
          Contact
        </Link>
      </nav>
      {!isAuthenticated ? (
        <div className="relative flex items-center gap-5">
          <Link to="/auth/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
          <Link to="/auth/reg" className="text-gray-300 hover:text-white">
            Registration
          </Link>
        </div>
      ) : (
        <div className="relative flex items-center gap-5">
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
      <button className=" absolute right-4 top-4" onClick={toggleMenu}>
        X
      </button>
    </div>
  );
}
