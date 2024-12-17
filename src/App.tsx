import { ToastContainer } from "react-toastify";
import NavigationMenu from "./components/NavigationMenu";

const App = () => {
  return (
    <>
      <NavigationMenu />,
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default App;
