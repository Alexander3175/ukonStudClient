import { create } from "zustand";

interface IPost {
  title: string;
  description: string;
  tags: string[];
  file?: string | null;
}

interface IPostStore {
  posts: IPost[] | null;
  setPosts: (posts: IPost[]) => void;
}

export const usePostStore = create<IPostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));
