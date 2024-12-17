import { useEffect } from "react";
import { fetchGames } from "../service/gameService";
import { usePostStore } from "../stores/postStore";
import { useQuery } from "@tanstack/react-query";

interface iPost {
  id: string | null | undefined;
  title: string;
  description: string;
  tags: string[];
  file?: string | null;
}

const MainPage = () => {
  const { setPost } = usePostStore();
  const { data, isLoading } = useQuery<iPost[]>({
    queryKey: ["posts"],
    queryFn: fetchGames,
  });

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data, setPost]);

  if (isLoading) return <div>Loading...</div>;

  function getPost() {
    const games = fetchGames();
    console.log(games);
    return games;
  }

  return (
    <>
      <button onClick={getPost}>GETPSOT</button>

      <div className="flex gap-5 border p-2">
        {data && data.length > 0 ? (
          data.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <ul>
                {post.tags.map((elem, index) => (
                  <li key={index}>{elem}</li>
                ))}
              </ul>
              {post.file ? (
                <img
                  src={`http://localhost:8080/${post.file.replace(/\\/g, "/")}`}
                  alt={post.title || "Post image"}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
};

export default MainPage;
