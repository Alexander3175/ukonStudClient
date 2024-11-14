import { Link } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <div className="bg-gray-900 text-white absolute top-0 left-0 w-full h-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-between py-6">
          <div className="flex items-center sm:items-stretch sm:justify-start">
            <div>
              <h1 className="text-2xl font-bold">Legion</h1>
            </div>
            <div className="flex items-center justify-center sm:ml-6">
              <div className="flex items-center justify-center space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">Home</a>
                <a href="#" className="text-gray-300 hover:text-white">About</a>
                <a href="#" className="text-gray-300 hover:text-white">Services</a>
                <a href="#" className="text-gray-300 hover:text-white">Contact</a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center gap-5">
            <Link to="login">Login</Link>
            <Link to="reg">Registration</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavigationMenu;
