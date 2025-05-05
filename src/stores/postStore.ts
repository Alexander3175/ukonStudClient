import { create } from "zustand";
import { IGame } from "../types/Game";

interface IPostStore {
  posts: IGame[] | null;
  setPosts: (posts: IGame[]) => void;
}

export const usePostStore = create<IPostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));
