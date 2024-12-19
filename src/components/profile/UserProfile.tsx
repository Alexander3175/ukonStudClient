import Game from "./components/game";
import User from "./components/user";

const UserProfile = () => {
  return (
    <>
      <section className="w-full py-10 pt-32">
        <div className="container mx-auto flex flex-wrap lg:flex-nowrap items-top px-4 justify-around">
          <User />
          <Game />
        </div>
      </section>
    </>
  );
};
export default UserProfile;
