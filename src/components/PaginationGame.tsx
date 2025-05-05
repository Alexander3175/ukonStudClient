import { useNavigate } from "react-router-dom";
import { IGame } from "../types/Game";

const PaginationGame = ({
  data,
  loading,
}: {
  data: IGame[];
  loading: unknown;
}) => {
  const navigate = useNavigate();

  if (loading) return <h3>loading</h3>;

  const handleClick = (id: string | null | undefined) => {
    if (id) {
      navigate(`/game/${id}`);
    }
  };
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 justify-center content-center">
      {data && data.length > 0 ? (
        data.map((post) => (
          <div
            key={post.id}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300 bg-gray-900"
            onClick={() => handleClick(post.id)}
            onKeyDown={(e) => e.key === "Enter" && handleClick(post.id)}
            role="button"
            tabIndex={0}
          >
            <img
              src={
                post.file
                  ? `http://localhost:8080/${post.file.replace(/\\/g, "/")}`
                  : "https://via.placeholder.com/400x300"
              }
              alt={post.title || "Post image"}
              className="w-full h-64 object-cover"
            />

            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center text-lg font-semibold p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {post.title}
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-400">
          No posts available
        </p>
      )}
    </section>
  );
};

export default PaginationGame;
