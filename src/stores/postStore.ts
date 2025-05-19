import { create } from "zustand";
import { IGame, ISteamGame } from "../types/Game";

interface IPostStore {
  posts: IGame[] ;
  steamOwnedGames: ISteamGame[];
  setSteamOwnedGames: (posts: ISteamGame[]) => void;
  setPosts: (posts: IGame[]) => void;
}

export const usePostStore = create<IPostStore>((set) => ({
  posts: [],
  steamOwnedGames: [],
  setSteamOwnedGames: (steamOwnedGames) => set({ steamOwnedGames }),
  setPosts: (posts) => set({ posts }),
}));
