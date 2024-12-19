import { create } from "zustand";

interface iPost {
  id: number;
  title: string;
  category: "Want" | "Playing" | "Beaten" | "Archived";
  file?: string | null;
}

interface iCategories {
  Want: iPost[];
  Playing: iPost[];
  Beaten: iPost[];
  Archived: iPost[];
}

interface iPostStore {
  categories: iCategories;
  selectedCategory: keyof iCategories;
  setSelectedCategory: (category: keyof iCategories) => void;
  addGameToCategory: (game: iPost, category: keyof iCategories) => void;
  removeGameFromCategory: (gameId: number, category: keyof iCategories) => void;
}

export const usePostStore = create<iPostStore>((set) => ({
  categories: {
    Want: [],
    Playing: [],
    Beaten: [],
    Archived: [],
  },
  selectedCategory: "Want",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addGameToCategory: (game, category) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [category]: [...state.categories[category], game],
      },
    })),
  removeGameFromCategory: (gameId, category) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [category]: state.categories[category].filter(
          (game) => game.id !== gameId
        ),
      },
    })),
}));
