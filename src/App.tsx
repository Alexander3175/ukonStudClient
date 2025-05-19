import { ToastContainer } from "react-toastify";
import NavigationMenu from "../src/components/navigations/NavigationMenu";

const App = () => {
  return (
    <>
      <NavigationMenu />,
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default App;
