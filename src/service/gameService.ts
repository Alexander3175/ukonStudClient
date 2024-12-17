const fetchGames = async () => {
  const response = await fetch("http://localhost:8080/games/games", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const games = await response.json();
  console.log("service:", games);
  return games;
};

export { fetchGames };
