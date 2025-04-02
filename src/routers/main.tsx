import { fetchGames } from "../service/gameService";
import { usePostStore } from "../stores/postStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PaginationGame from "../components/ui/PaginationGame";

interface IPost {
  id: string | null | undefined;
  title: string;
  description: string;
  tags: string[];
  file?: string | null;
}

const MainPage = () => {
  const { setPosts } = usePostStore();
  const { data, isLoading } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: fetchGames,
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
      console.log("SetData", data);
    }
  }, [data, setPosts]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-3xl text-white font-bold mb-8">🎮 Popular Games</h1>
      <div className="w-full max-w-7xl px-4 ">
        <PaginationGame data={data || []} />
      </div>
    </div>
  );
};

export default MainPage;
