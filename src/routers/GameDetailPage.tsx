import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../service/gameService";

interface Game {
  title: string;
  description: string;
  tags: string[];
  file?: string;
}

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string | undefined }>();
  console.log(gameId);
  const { data, isLoading } = useQuery<Game>({
    queryKey: ["gameDetail"],
    queryFn: () => fetchGameDetails(gameId!),
  });

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <>
      {data ? (
        <div className="game-detail-page max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-xl shadow-2xl mt-24">
          <h1 className="text-4xl font-bold text-white mb-6">{data.title}</h1>

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

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {data?.description}
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Tags:</h2>
            <ul className="flex flex-wrap gap-4">
              {data.tags.map((tag, index) => (
                <li
                  key={index}
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
    </>
  );
};

export default GameDetailPage;
