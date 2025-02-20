import Cookies from "js-cookie";

const fetchCreatePost = async (formData: FormData) => {
  console.log("FetchCreatePost");
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("Access token is missing");
  }
  const response = await fetch("http://localhost:8080/games/create", {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create game: ${errorMessage}`);
  }

  return await response.json();
};

export { fetchCreatePost };
