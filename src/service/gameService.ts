interface Game {
  title: string;
  file: string;
  description: string;
  tags: string[];
}

const fetchGames = async () => {
  const response = await fetch("http://localhost:8080/games/games", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const games = await response.json();
  return games;
};

const fetchGameDetails = async (gameId: string) => {
  const response = await fetch(`http://localhost:8080/games/game/${gameId}`, {
    method: "GET",
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const game: Game = await response.json();
  console.log(game);
  return game;
};

export { fetchGames, fetchGameDetails };
