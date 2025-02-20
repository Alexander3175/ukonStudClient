import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../service/gameService";
import { useProfileStore } from "../stores/profileStore";
import { useState } from "react";
import { toast } from "react-toastify";

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
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <>
      {data ? (
        <div className="game-detail-page max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-xl shadow-2xl mt-24">
          <h1 className="text-4xl font-bold text-white mb-6">{data.title}</h1>
          <button
            onClick={openModal}
            className="bg-blue-600 text-white px-4 py-2  mb-5 rounded-full hover:bg-blue-700 transition"
          >
            Add to profile list
          </button>
          <div className="relative">
            <img
              src={`http://localhost:8080/${data?.file?.replace(/\\/g, "/")}`}
              alt={data.title}
              className="w-full h-96 object-cover rounded-lg shadow-md mb-6"
            />
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-opacity-80 transition">
              View Details
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed break-words">
            {data?.description}
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Tags:</h2>
            <ul className="flex flex-wrap gap-4">
              {data.tags.map((tag, index) => (
                <li
                  key={`${tag}-${index}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
                >
                  {tag}
                </li>
              ))}
            </ul>
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
