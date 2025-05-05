import * as profileService from "../service/profileService";

import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { getTokenAndUserId } from "../util/auth";

interface DecodedToken {
  id: number;
}

interface IPost {
  id: number;
  title: string;
  category: "Want" | "Playing" | "Beaten" | "Archived";
  file?: string | null;
}

interface ICategories {
  Want: IPost[];
  Playing: IPost[];
  Beaten: IPost[];
  Archived: IPost[];
}

interface IPostStore {
  games: IPost[];
  categories: ICategories;
  selectedCategory: keyof ICategories;
  loading: boolean;
  setSelectedCategory: (category: keyof ICategories) => void;
  addGame: (game: IPost, category: keyof ICategories) => void;
  removeGameFromCategory: (gameId: number, category: keyof ICategories) => void;
  fetchGames: () => void;
}

export const useProfileStore = create<IPostStore>()(
  persist(
    (set) => ({
      categories: {
        Want: [],
        Playing: [],
        Beaten: [],
        Archived: [],
      },
      selectedCategory: "Want",
      games: [],
      loading: false,
      fetchGames: async (): Promise<void> => {
        const { token, userId } = getTokenAndUserId();
        set({ loading: true });
        try {
          const data = await profileService.fetchGame(userId, token);

          const categories: ICategories = {
            Want: [],
            Playing: [],
            Beaten: [],
            Archived: [],
          };

          data.forEach((item) => {
            if (item.game) {
              categories[item.category].push({
                ...item.game,
                category: item.category,
              });
            }
          });

          set({
            games: data.map((item) => ({
              ...item.game,
              category: item.category,
            })),
            categories,
            loading: false,
          });
        } catch (error) {
          console.error("Failed to get games:", error);
          set({ loading: false });
          toast.error("Failed to load games. Please try again.");
        }
      },
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      addGame: async (game, category): Promise<void> => {
        const { token } = getTokenAndUserId();
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          await profileService.fetchAddGame(
            game.id,
            decodedToken.id,
            category,
            token
          );

          set((state) => {
            const isGameExist = state.categories[category].some(
              (existingGame) => existingGame.id === game.id
            );
            if (!isGameExist) {
              return {
                games: [...state.games, game],
                categories: {
                  ...state.categories,
                  [category]: [...state.categories[category], game],
                },
              };
            }
            return state;
          });

          toast.success("Гру успішно додано!");
        } catch (error) {
          console.error("Помилка при додаванні гри: ", error);
          toast.error("Не вдалося додати гру. Спробуйте ще раз.");
        }
      },

      removeGameFromCategory: (gameId, category) =>
        set((state) => {
          const updatedCategory = state.categories[category].filter(
            (game) => game.id !== gameId
          );
          const updatedGames = state.games.filter((game) => game.id !== gameId);

          return {
            categories: {
              ...state.categories,
              [category]: updatedCategory,
            },
            games: updatedGames,
          };
        }),
    }),
    { name: "postStore" }
  )
);
