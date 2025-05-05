import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../service/gameService";
import { useProfileStore } from "../stores/profileStore";
import { useState } from "react";
import { toast } from "react-toastify";

import "../assets/styles/StylesRouterPages/GameDetailStyle.css";
import NavigationMenu from "../components/NavigationMenu";
import { useUserStore } from "../stores/userStore";
import { IGame } from "../types/Game";

const categories = ["Want", "Playing", "Beaten", "Archived"] as const;

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string | undefined }>();
  const addGame = useProfileStore((state) => state.addGame);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery<IGame>({
    queryKey: ["gameDetail"],
    queryFn: () => {
      if (!gameId) throw new Error("Game ID is required");
      return fetchGameDetails(gameId);
    },
    enabled: !!gameId,
  });

  const openModal = () => {
    if (!data?.title) return toast.error("Game details are missing.");
    if (!isAuthenticated)
      return toast.info("Увійдіть, щоб додавати ігри до профілю.");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddGame = (category: (typeof categories)[number]) => {
    if (!data || !data.title) return;
    addGame(
      { id: Number(gameId), title: data.title, category, file: data.file },
      category
    );
    toast.success(`Added to profile in '${category}'`);
    setIsModalOpen(false);
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  if (!data)
    return (
      <div className="text-center text-xl text-red-500">Game not found.</div>
    );

  return (
    <>
      <NavigationMenu />,
      <div className="wrapper-game conteiner">
        <div className="mr-6">
          <div className="titleAndStar">
            <h1 className="title">{data.title}</h1>
            <div className="STAR"></div>
          </div>
          <div className="image-container conteiner">
            <img
              src={`http://localhost:8080/${data?.file?.replace(/\\/g, "/")}`}
              alt={data.title}
              className="image"
            />
          </div>
          <div className="my-5 w-[365px]">
            <h2 className="text-4xl font-bold">Summary</h2>
            <p className="description">{data?.description}</p>
          </div>
          <div className="flex  rounded-xl mt-[10%]">
            <div className="w-full border-r pr-4">
              <h3 className=" text-white text-lg">Genres</h3>
              <div className="mt-2">
                <div className="bg-gray-600 rounded-lg py-1 pl-3">
                  Genres test
                </div>
              </div>
            </div>
            <div className="w-full pl-4">
              <h3 className=" text-white text-lg">Features</h3>
              <div className="mt-2">
                <div className="bg-gray-600 rounded-lg py-1 pl-3">
                  Features test
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-informationGame">
          <div className="line flex w-full">
            <span>Developer:</span>
            <span> {data.gameDeveloper}</span>
          </div>
          <div className="line flex w-full">
            <span>Release Date:</span>
            <span>{data.releaseDate}</span>
          </div>
          <div className="line flex w-full">
            <span>Platform (device): </span>
            <span>{data.platform}</span>
          </div>
          <div className="my-7">
            <h2 className="tags-container">Tags:</h2>
            <div className="flex flex-wrap gap-4">
              {data.tags.map((tag, index) => (
                <span key={`${tag}-${index}`} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button onClick={openModal} className="button">
            Add to profile list
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add Game to Profile</h2>
            <p>To which category do you want to add {data?.title}?</p>
            <div className="mt-4">
              <ul className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition border-none"
                    onClick={() => handleAddGame(category)}
                  >
                    {category}
                  </button>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeModal}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetailPage;
