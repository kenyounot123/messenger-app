import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSignIn, setUserSignIn] = useState(0);
  useEffect(() => {
    fetchData();
  }, [userSignIn]);
  async function fetchData() {
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/api/v1/users";
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } else if (response.status === 401) {
        const refreshSuccess = await refreshToken();
        if (refreshSuccess) {
          // Retry fetching user data after refreshing the token
          fetchData();
        } else {
          localStorage.clear();
        }
      } else {
        console.error("failed to fetch user data");
      }
    } catch (error) {
      console.log("error fetching user data: ", error);
    } finally {
      setLoading(false);
    }
  }
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const url = "http://localhost:3000/users/tokens/refresh";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token); // Update the access token
        return true;
      } else {
        console.error("Failed to refresh token");
        return false;
      }
    } catch (error) {
      console.log("Error refreshing token:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, setUserSignIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
