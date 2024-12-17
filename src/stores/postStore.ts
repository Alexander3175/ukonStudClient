import { create } from "zustand";

interface iPost {
  title: string;
  description: string;
  tags: string[];
  file?: string | null;
}

interface iPostStore {
  post: iPost[] | null;
  setPost: (post: iPost[]) => void;
}

export const usePostStore = create<iPostStore>((set) => ({
  post: null,
  setPost: (post) => set({ post }),
}));
