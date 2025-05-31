import * as profileService from "../service/profileService";

import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { getTokenAndUserId } from "../util/auth";
import { updateCategoryService } from "../service/profileService";

interface DecodedToken {
  id: number;
}

interface IPost {
  id: number;
  title: string;
  category: "Want" | "Playing" | "Beaten" | "Archived";
  file?: string | null;
}

export interface ICategories {
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
  updateGameCategory: (
    gameId: number,
    oldCategory: keyof ICategories,
    newCategory: keyof ICategories
  ) => void;
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
      updateGameCategory: async (
        gameId,
        oldCategory,
        newCategory
      ): Promise<void> => {
        const { token, userId } = getTokenAndUserId();
        try {
          if (!newCategory) {
            await profileService.removeGameFromCategory(gameId, userId, token);
            set((state) => {
              const updatedOld = state.categories[oldCategory].filter(
                (g) => g.id !== gameId
              );

              const updatedGames = state.games.filter((g) => g.id !== gameId);

              return {
                categories: {
                  ...state.categories,
                  [oldCategory]: updatedOld,
                },
                games: updatedGames,
              };
            });

            toast.success("Гру видалено з категорії.");
            return;
          }
          await updateCategoryService(gameId, userId, newCategory, token);

          set((state) => {
            const gameToMove = state.categories[oldCategory].find(
              (g) => g.id === gameId
            );
            if (!gameToMove) return state;

            const updatedOld = state.categories[oldCategory].filter(
              (g) => g.id !== gameId
            );
            const updatedNew = [
              ...state.categories[newCategory],
              { ...gameToMove, category: newCategory },
            ];

            return {
              categories: {
                ...state.categories,
                [oldCategory]: updatedOld,
                [newCategory]: updatedNew,
              },
              games: state.games.map((g) =>
                g.id === gameId ? { ...g, category: newCategory } : g
              ),
            };
          });

          toast.success("Категорію гри успішно оновлено!");
        } catch (error) {
          console.error("Помилка при оновленні категорії гри: ", error);
          toast.error("Не вдалося оновити категорію гри.");
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
