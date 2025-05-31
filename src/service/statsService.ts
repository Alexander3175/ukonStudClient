import { GameWithAchievements } from "../routers/achivments";
import { ISteamGame } from "../types/Game";

async function fetchStats(
  games: ISteamGame[],
  achievements: GameWithAchievements[]
) {
  const topHoursGames = TopHoursInGame(games);
  const topAchievements = TopAchivments(achievements);
  const topPlaytimeWeeks = TopHoursTwoWeeksInGame(games);
  const totalHours = topHoursGames.reduce(
    (acc, game) => acc + game.playtime_forever,
    0
  );

  const totalAchievements = topAchievements.reduce(
    (acc, game) => acc + game.unlocked,
    0
  );

  return {
    topHoursGames,
    topAchievements,
    totalHours,
    totalAchievements,
    topPlaytimeWeeks,
  };
}

function TopHoursInGame(games: ISteamGame[]): ISteamGame[] {
  if (!games || games.length === 0) return [];
  console.log("service", games);

  return [...games]
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, 3);
}

function TopHoursTwoWeeksInGame(games: ISteamGame[]): ISteamGame[] {
  if (!games || games.length === 0) return [];
  console.log("service", games);

  return [...games]
    .sort((a, b) => (b.playtime_2weeks ?? 0) - (a.playtime_2weeks ?? 0))
    .slice(0, 3);
}

function TopAchivments(
  achivments: GameWithAchievements[]
): GameWithAchievements[] {
  if (!achivments || achivments.length === 0) return [];
  console.log("service", achivments);

  return [...achivments].sort((a, b) => b.unlocked - a.unlocked).slice(0, 3);
}

export { TopHoursInGame, TopAchivments, fetchStats };
