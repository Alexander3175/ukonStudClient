interface IGame {
  id: string | null | undefined;
  title: string;
  description: string;
  tags: string[];
  gameDeveloper: string;
  releaseDate: string;
  platform: string;
  file?: string | null;
}
interface SteamOwnedGamesPayload {
  response: {
    game_count: number;
    games: ISteamGame[];
  };
}
interface ISteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  playtime_2weeks?: number;
  img_icon_url?: string;
  img_logo_url?: string;
  has_community_visible_stats?: boolean;
  rtime_last_played?: number;
  achievements?: Achievement[];
}

interface Achievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
}
export type { IGame, ISteamGame, Achievement, SteamOwnedGamesPayload };
