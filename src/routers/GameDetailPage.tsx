import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../service/gameService";
import { useProfileStore } from "../stores/profileStore";
import { useState } from "react";
import { toast } from "react-toastify";

import "../assets/styles/StylesRouterPages/GameDetailStyle.css";

interface Game {
  title: string;
  description: string;
  tags: string[];
  file?: string;
}

const categories = ["Want", "Playing", "Beaten", "Archived"] as const;

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string | undefined }>();
  const addGame = useProfileStore((state) => state.addGame);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(gameId);
  const { data, isLoading } = useQuery<Game>({
    queryKey: ["gameDetail"],
    queryFn: () => {
      if (!gameId) throw new Error("Game ID is required");
      return fetchGameDetails(gameId);
    },
    enabled: !!gameId,
  });

  const openModal = () => {
    if (data?.title) {
      setIsModalOpen(true);
    } else {
      toast.error("Game details are missing.");
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <>
      {data ? (
        <div className="wrapper-game">
          <div>
            <div className="image-container">
              <img
                src={`http://localhost:8080/${data?.file?.replace(/\\/g, "/")}`}
                alt={data.title}
                className="image"
              />
            </div>
            <div className="flex gap-5 align-middle bg-slate-800 p-[25px] rounded-xl mt-[10%]">
              <div>qweqweqe</div>
              <div>qweqweqe</div>
            </div>
          </div>

          <div className="content-informationGame">
            <h1 className="title">{data.title}</h1>
            <div className="game__platforms">
              <span>PC (Microsoft Windows)</span>
            </div>
            <button onClick={openModal} className="button">
              Add to profile list
            </button>
            <div className="flex w-full align-middle bg-slate-800 p-[25px] rounded-xl">
              <div className="w-1/2">Developer:</div>
              <div className="w-1/2">Publisher</div>
            </div>
            <div className="wrapper-tags">
              <h2 className="tags-container">Tags:</h2>
              <div className="flex flex-wrap gap-4">
                {data.tags.map((tag, index) => (
                  <span key={`${tag}-${index}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="my-5">
              <h2 className="text-4xl font-bold">Summary</h2>
              <p className="description">
                asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
                {data?.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
                    onClick={() => {
                      if (data?.title) {
                        addGame(
                          {
                            id: Number(gameId),
                            title: data.title,
                            category,
                            file: data.file,
                          },
                          category
                        );
                        closeModal();
                        toast.success(`Added to profile in '${category}'`);
                      } else {
                        console.error("Game title is undefined.");
                      }
                    }}
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
