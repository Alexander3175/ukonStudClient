import { IUserSteam } from "../../types/User";
import Game from "./components/game";
import User from "./components/user";
interface ProfileProps {
  user: IUserSteam;
}
const LocalProfile = ({ user }: ProfileProps) => {
  return (
    <>
      <User user={user} />
      <Game user={user} />
    </>
  );
};

export default LocalProfile;
