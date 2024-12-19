import { useNavigate } from "react-router-dom";
import { usePostStore } from "../../../stores/profileStore";

const Game = () => {
  const { selectedCategory, setSelectedCategory, categories } = usePostStore(
    (state) => state
  );
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
        <h2 className="font-medium text-2xl mb-4">Games by Sarah Smith</h2>
      </div>
      <div className="border-b pb-5">
        <ul className="flex justify-between p-4 shadow-2xl rounded-lg gap-4">
          {["Want", "Playing", "Beaten", "Archived"].map((category) => (
            <li
              key={category}
              className={`hover:text-blue-600 cursor-pointer ${
                selectedCategory === category ? "text-blue-600" : ""
              }`}
              onClick={() =>
                handleCategoryClick(category as keyof typeof categories)
              }
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">{selectedCategory} Games</h3>
        <ul className="flex flex-wrap gap-3">
          {categories[selectedCategory].length === 0 ? (
            <li>No games in this category yet.</li>
          ) : (
            categories[selectedCategory].map((game) => (
              <li
                key={game.id}
                className="relative w-72 overflow-hidden rounded-lg shadow-2xl border-gray-600 transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                onClick={() => handleGameClick(game.id)}
              >
                <img
                  src={
                    game.file
                      ? `http://localhost:8080/${game.file.replace(/\\/g, "/")}`
                      : "https://via.placeholder.com/400x300"
                  }
                  alt={game.title || "Game image"}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center text-lg font-semibold p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {game.title}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Game;
