import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const NavigationMenu = () => {
  const { isAuthenticated, logout, userRole } = useUserStore();
  const roleAdmin = userRole.map((role) => role.role);
  function Logout() {
    logout();
  }
  return (
    <div className="bg-gray-900 text-white fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-between py-6">
          <div className="flex items-center sm:items-stretch sm:justify-start">
            <div>
              <h1 className="text-2xl font-bold">Legion</h1>
            </div>
            <div className="flex items-center justify-center sm:ml-6">
              <div className="flex items-center justify-center space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>

                <a href="#" className="text-gray-300 hover:text-white">
                  About
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Services
                </a>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          {roleAdmin.includes("admin") ? (
            <Link to="/adminPanel">Admin Panel</Link>
          ) : null}

          {!isAuthenticated ? (
            <div className="relative flex items-center gap-5">
              <Link to="auth/login">Login</Link>
              <Link to="auth/reg">Registration</Link>
            </div>
          ) : (
            <div className="relative flex items-center gap-5">
              <button onClick={Logout}>Logout</button>
              <Link to="/profile">Profile</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavigationMenu;
