import { create } from "zustand";

interface IPost {
  title: string;
  description: string;
  tags: string[];
  file?: string | null;
}

interface IPostStore {
  post: IPost[] | null;
  setPost: (post: IPost[]) => void;
}

export const usePostStore = create<IPostStore>((set) => ({
  post: null,
  setPost: (post) => set({ post }),
}));
