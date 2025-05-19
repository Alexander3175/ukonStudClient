import Game from "../components/profile/components/game";
import User from "../components/profile/components/user";
import { TWitchUser } from "../types/User";
interface ProfileProps {
  user: TWitchUser;
}
const UserProfile = ({ user }: ProfileProps) => {
  return (
    <section className="w-full py-10 pt-32">
      <div className="mx-auto flex flex-wrap lg:flex-nowrap items-top px-4 justify-around">
        <User user={user} />
        <Game user={user} />
      </div>
    </section>
  );
};
export default UserProfile;
