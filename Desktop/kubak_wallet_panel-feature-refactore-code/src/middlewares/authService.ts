// Function to store tokens in localStorage
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Function to retrieve tokens from localStorage
export const getTokens = () => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
});

// Function to remove tokens from localStorage
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const { accessToken } = getTokens();
  return !!accessToken;
};
