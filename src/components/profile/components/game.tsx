import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../../stores/profileStore";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "../../../stores/userStore";

const Game = () => {
  const { selectedCategory, setSelectedCategory, categories, loading } =
    useProfileStore((state) => state);
  const { user } = useUserStore();

  useEffect(() => {
    const savedCategory = localStorage.getItem("userCategoryes");
    if (
      savedCategory &&
      ["Want", "Playing", "Beaten", "Archived"].includes(savedCategory)
    ) {
      setSelectedCategory(savedCategory as keyof typeof categories);
    }
  }, [setSelectedCategory]);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("Access token is missing");
      return;
    }
  }, []);
  /*
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      fetchGames(userId);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
*/
  const navigate = useNavigate();

  const handleCategoryClick = (category: keyof typeof categories) => {
    setSelectedCategory(category);
  };

  const handleGameClick = (gameId: number) => {
    navigate(`/game/${gameId}`);
  };
  return (
    <div className="w-full lg:w-2/3">
      <div>
        <h2 className="font-medium text-2xl mb-4">Games by {user?.username}</h2>
      </div>
      <div className="border-b pb-5">
        <div className="flex justify-between p-4 shadow-2xl rounded-lg gap-4">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              className={`hover:text-blue-600 cursor-pointer bg-transparent ${
                selectedCategory === category ? "text-blue-600" : ""
              }`}
              onClick={() =>
                handleCategoryClick(category as keyof typeof categories)
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">{selectedCategory} Games</h3>
        {loading ? (
          <p>Loading games...</p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {categories[selectedCategory]?.length === 0 ? (
              <li>No games in this category yet.</li>
            ) : (
              categories[selectedCategory].map((game) => {
                return (
                  <button
                    key={game.id}
                    className="relative w-72 overflow-hidden bg-transparent rounded-lg shadow-2xl border-none transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleGameClick(game.id)}
                  >
                    <img
                      src={
                        game.file
                          ? `http://localhost:8080/${game.file.replace(/\\/g, "/")}`
                          : "https://via.placeholder.com/400x300"
                      }
                      alt={game.title || "Post image"}
                      className="w-full h-72 object-cover transition-opacity duration-300 opacity-100"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center text-lg font-semibold p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {game.title}
                    </div>
                  </button>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Game;
