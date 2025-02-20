import Cookies from "js-cookie";

import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
}

interface IPost {
  id: number;
  title: string;
  category: "Want" | "Playing" | "Beaten" | "Archived";
  file?: string | null;
}
interface IGameResponse {
  id: number;
  category: keyof ICategories;
  game: {
    id: number;
    title: string;
    file?: string | null;
  };
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
  fetchGames: (userId: number) => void;
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
      fetchGames: async (userId: number): Promise<void> => {
        set({ loading: true });
        try {
          const response = await fetch(
            `http://localhost:8080/profile/games/${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch games");
          }

          const data: IGameResponse[] = await response.json();

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
          toast.success("Games fetched successfully!");
        } catch (error) {
          console.error("Failed to get games:", error);
          set({ loading: false });
          toast.error("Failed to load games. Please try again.");
        }
      },
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      addGame: async (game, category): Promise<void> => {
        const token = Cookies.get("accessToken");

        try {
          if (!token) {
            console.error("Token not found");
            return;
          }
          const decodedToken = jwtDecode<DecodedToken>(token);
          const userId = decodedToken.id;
          const response = await fetch(
            "http://localhost:8080/profile/addGame",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ gameId: game.id, userId, category }),
            }
          );
          if (!response.ok) {
            toast.error("Не вдалося додати гру");
            throw new Error("Не вдалося додати гру");
          }

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
