import { fetchGames } from "../service/gameService";
import { usePostStore } from "../stores/postStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PopularGame from "../components/ui/PopularGame";
import NavigationMenu from "../components/NavigationMenu";
import PaginationGame from "../components/PaginationGame";
import Pagination from "../components/ui/pagination";
import { IGame } from "../types/Game";

const MainPage = () => {
  const { setPosts } = usePostStore();
  const { data, isLoading } = useQuery<IGame[]>({
    queryKey: ["posts"],
    queryFn: fetchGames,
  });
  const [paginationPosts, setPaginationPosts] = useState<IGame[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    if (data) {
      setPosts(data);
      setPaginationPosts(data);
    }
  }, [data, setPosts]);

  if (isLoading) return <div>Loading...</div>;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = paginationPosts.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <NavigationMenu />

      <div className="flex flex-col items-center py-10">
        <div className="w-full max-w-7xl px-4 mt-[7%]">
          <h1 className="text-3xl text-white font-bold mb-8 text-center">
            🎮 Popular Games
          </h1>
          <PopularGame data={data || []} />
        </div>

        <div className="w-full max-w-7xl px-4 mt-[7%]">
          <h1 className="text-3xl text-white font-bold mb-8 text-center">
            🎮 Games
          </h1>
          <PaginationGame data={currentPost || []} loading={isLoading} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={paginationPosts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
