import Cookies from "js-cookie";

const fetchLoginUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Login failed: ${response.status} - ${errorData.message || response.statusText}`
      );
    }

    const { accessToken } = await response.json();

    if (!accessToken) throw new Error("No access token received");

    Cookies.set("accessToken", accessToken);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const fetchCreateUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch("http://localhost:8080/auth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} - ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed: " + error);
  }
};

export { fetchLoginUser, fetchCreateUser };
