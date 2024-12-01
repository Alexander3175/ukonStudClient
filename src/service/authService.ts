const fetchLoginUser = async (
  email: string,
  password: string
): Promise<null> => {
  const user = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await user.json();

  const { accessToken } = data;
  if (!user.ok) {
    throw new Error("Login failed");
  }
  localStorage.setItem("accessToken", accessToken);

  return null;
};

const fetchCreateUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch("http://localhost:8080/auth/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export { fetchLoginUser, fetchCreateUser };
