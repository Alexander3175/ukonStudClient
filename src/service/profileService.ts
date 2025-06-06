import { toast } from "react-toastify";

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

const fetchGame = async (
  userId: number,
  token: string
): Promise<IGameResponse[]> => {
  const response = await fetch(
    `http://localhost:8080/profile/games/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
};

const fetchAddGame = async (
  gameId: number,
  userId: number,
  category: keyof ICategories,
  token: string
): Promise<void> => {
  const response = await fetch("http://localhost:8080/profile/addGame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ gameId, userId, category }),
  });
  if (!response.ok) {
    toast.error("Не вдалося додати гру");
    throw new Error("Не вдалося додати гру");
  }
};

const updateCategoryService = async (
  gameId: number,
  userId: number,
  newCategory: "Want" | "Playing" | "Beaten" | "Archived",
  token: string
): Promise<void> => {
  const response = await fetch(
    `http://localhost:8080/profile/game/${gameId}/category`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId, userId, newCategory }),
    }
  );
  if (!response.ok) {
    toast.error("Не вдалося додати гру");
    throw new Error("Не вдалося додати гру");
  }
};
const removeGameFromCategory = async (
  gameId: number,
  userId: number,
  token: string
): Promise<void> => {
  const response = await fetch(
    `http://localhost:8080/api/users/${userId}/games/${gameId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove game from category");
  }
};

export {
  fetchGame,
  fetchAddGame,
  updateCategoryService,
  removeGameFromCategory,
};
