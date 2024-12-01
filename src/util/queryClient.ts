import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url, options] = Array.isArray(queryKey) ? queryKey : [queryKey];
        const token = localStorage.getItem("accessToken");

        const headers = {
          ...options?.headers,
          Authorization: token ? `Bearer ${token}` : "",
        };

        const response = await fetch(url, {
          ...options,
          headers,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      },
    },
  },
});

export default queryClient;
