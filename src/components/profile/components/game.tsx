import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../../stores/profileStore";
import { useEffect } from "react";
import { IUser, IUserSteam, TWitchUser } from "../../../types/User";
import { fetchSteamGames } from "../../../service/gameService";
import { usePostStore } from "../../../stores/postStore";
import { GameCard } from "./GameCard";
import { IGame, ISteamGame } from "../../../types/Game";

interface GameProps {
  user: TWitchUser;
}
const isSteamUser = (u: TWitchUser): u is IUserSteam => "steamId" in u;
const isLocalUser = (u: TWitchUser): u is IUser => "username" in u;

const getGameImage = (game: IGame | ISteamGame): string => {
  if ("file" in game && game.file) {
    return `http://localhost:8080/${game.file.replace(/\\/g, "/")}`;
  } else if ("appid" in game) {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`;
  }
  return "https://via.placeholder.com/400x300";
};

const Game = ({ user }: GameProps) => {
  const { selectedCategory, setSelectedCategory, categories, loading } =
    useProfileStore((state) => state);

  const steamOwnedGames = usePostStore((state) => state.steamOwnedGames);
  const setSteamOwnedGames = usePostStore((state) => state.setSteamOwnedGames);

  useEffect(() => {
    if (!isSteamUser(user)) return;

    const fetchGames = async () => {
      const response = await fetchSteamGames(user.steamId);
      setSteamOwnedGames(response);
    };

    fetchGames();
  }, [user, setSteamOwnedGames]);

  useEffect(() => {
    const savedCategory = localStorage.getItem("userCategoryes");

    if (
      savedCategory &&
      ["Want", "Playing", "Beaten", "Archived"].includes(savedCategory) &&
      savedCategory !== selectedCategory
    ) {
      setSelectedCategory(savedCategory as keyof typeof categories);
    }
  }, [selectedCategory, setSelectedCategory, categories]);

  const navigate = useNavigate();

  const localGames = categories[selectedCategory] ?? [];
  const games = isSteamUser(user)
    ? steamOwnedGames
    : (localGames as unknown as (IGame | ISteamGame)[]);

  const handleCategoryClick = (category: keyof typeof categories) => {
    if (category !== selectedCategory) setSelectedCategory(category);
  };

  const handleGameClick = (gameId: string | number) => {
    navigate(`/game/${gameId}`);
  };

  let content;
  if (loading) {
    content = <p>Loading games...</p>;
  } else if (games.length === 0) {
    content = <p>No games found.</p>;
  } else {
    content = (
      <ul className="flex flex-wrap gap-3">
        {games.map((g) =>
          "id" in g ? (
            <GameCard
              key={g.id}
              id={g.id as string | number}
              title={g.title}
              image={getGameImage(g)}
              isSteam={false}
              onClick={handleGameClick}
            />
          ) : (
            <GameCard
              key={g.appid}
              id={g.appid}
              title={g.name}
              image={getGameImage(g)}
              isSteam={true}
              onClick={handleGameClick}
            />
          )
        )}
      </ul>
    );
  }
  return (
    <div className="w-full lg:w-2/3">
      <div>
        <h2 className="font-medium text-2xl mb-4">
          Games by {isLocalUser(user) ? user.username : user.displayName}
        </h2>
      </div>

      {!isSteamUser(user) && (
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
      )}

      <div className="mt-4">
        {!isSteamUser && (
          <h3 className="text-xl font-semibold mb-4">
            {selectedCategory} Games
          </h3>
        )}

        <div className="mt-4">
          {!isSteamUser(user) && (
            <h3 className="text-xl font-semibold mb-4">
              {selectedCategory} Games
            </h3>
          )}
          {content}
        </div>
      </div>
    </div>
  );
};

export default Game;
