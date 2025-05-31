import { Link } from "react-router-dom";
import { IUserSteam, TWitchUser } from "../../../types/User";
import { lastSee } from "../../../util/dayJs";
interface Props {
  user: TWitchUser;
}
const User = ({ user }: Props) => {
  const isSteamUser = (user: TWitchUser): user is IUserSteam =>
    "steamId" in user;

  const avatar =
    isSteamUser(user) && user.photos.length > 0
      ? user.photos[2].value
      : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";
  console.log("Steam profile", user);
  return (
    <div className="w-[50vh]">
      <div className="flex flex-col gap-3 max-w-sm mx-auto bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src={
              "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            }
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-full w-full"
            src={avatar}
            alt="Woman looking front"
          />
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="flex gap-3">
            <h2 className="font-bold text-xl">
              {user && !isSteamUser(user) ? user.username : user?.displayName}
            </h2>
            <span className="font-bold text-xl tracking-[.05em]">
              {user && !isSteamUser(user) ? "" : user?.country}
            </span>
          </div>
          <span className="font-bold tracking-[.02em]">
            {user && "username" in user ? (
              ""
            ) : (
              <p>Останній вхід: {lastSee(user.lastLogoffAt)}</p>
            )}
          </span>
        </div>
        {isSteamUser(user) && (
          <Link
            to={`/steam/games/achievements/${user.steamId}`}
            className="bg-slate-900 w-full p-2 text-center font-bold text-xl text-white"
          >
            Stats
          </Link>
        )}
      </div>
    </div>
  );
};
export default User;
