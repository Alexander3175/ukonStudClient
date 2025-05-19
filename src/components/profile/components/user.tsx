import { TWitchUser } from "../../../types/User";
interface Props {
  user: TWitchUser;
}
const User = ({ user }: Props) => {
  return (
    <div className="w-[50vh]">
      <div className="max-w-sm mx-auto bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-full w-full"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            alt="Woman looking front"
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="font-bold text-xl">
            {user && "username" in user ? user.username : user?.displayName}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default User;
