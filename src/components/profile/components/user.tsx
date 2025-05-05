import { useUserStore } from "../../../stores/userStore";

const User = () => {
  const { user } = useUserStore();
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
          <h2 className="font-bold text-xl">{user?.username}</h2>
          {/*<p className="text-gray-500 text-sm">Warcrafter</p>*/}
        </div>
        {/*
          <ul className="py-4 mt-4 text-gray-700 flex items-center justify-around">
            <li className="flex flex-col items-center">
              <svg
                className="w-5 h-5 fill-current text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <div className="text-sm font-medium">2k</div>
            </li>
            <li className="flex flex-col items-center">
              <svg
                className="w-5 h-5 fill-current text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
              </svg>
              <div className="text-sm font-medium">10k</div>
            </li>
          </ul>
        */}
      </div>
    </div>
  );
};
export default User;
