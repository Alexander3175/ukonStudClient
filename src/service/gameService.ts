import Cookies from "js-cookie";
import { IGame, ISteamGame, SteamOwnedGamesPayload } from "../types/Game";

const getToken = () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    console.warn("Токен доступу відсутній. Користувач не авторизований.");
    return null;
  }
  return token;
};
const fetchGames = async () => {
  const token = getToken();
  const response = await fetch("http://localhost:8080/games/games", {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const games = await response.json();
  return games;
};

const fetchSteamGames = async (steamId: string): Promise<ISteamGame[]> => {
  const token = getToken() as string | null;
  const res = await fetch(
    `http://localhost:8080/steam/steam/getGames/${steamId}`,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  const data: SteamOwnedGamesPayload = await res.json();
  return data.response?.games ?? [];
};

const fetchGameDetails = async (gameId: string) => {
  const response = await fetch(`http://localhost:8080/games/game/${gameId}`, {
    method: "GET",
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const game: IGame = await response.json();
  console.log(game);
  return game;
};

export { fetchGames, fetchGameDetails, fetchSteamGames };
