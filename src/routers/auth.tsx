import { Outlet } from "react-router-dom";
import NavigationMenu from "../components/NavigationMenu";

function AuthPage() {

  return (
    <section>
      <NavigationMenu />
      <Outlet />
    </section>
  )
}
export default AuthPage
