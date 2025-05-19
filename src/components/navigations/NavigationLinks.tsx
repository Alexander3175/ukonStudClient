import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavigationLinks = () => {
  const { isAuthenticated, logout, userRole } = useAuth();
  const roleAdmin =
    Array.isArray(userRole) && userRole.some((role) => role.role === "ADMIN");

  return {
    left: (
      <>
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
        {roleAdmin && (
          <Link
            to="/adminPanel"
            className="admin flex items-center gap-3 text-gray-300 hover:text-white"
          >
            Admin Panel
          </Link>
        )}
      </>
    ),
    right: (
      <>
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
      </>
    ),
  };
};

export default NavigationLinks;
