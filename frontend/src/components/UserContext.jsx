import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSignIn, setUserSignIn] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchData() {
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/api/v1/users";

    if (token) {
      await refreshToken(token);
    }

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
      } else if (response.status === 401) {
        // This correct behavior
        setErrorMessage("Your session has expired. Please sign in again.");
      } else {
        setErrorMessage(
          "There is no user saved in local storage and No User is not signed in"
        );
      }
    } catch (error) {
      console.log("Error fetching user data: ", error);
    } finally {
      setLoading(false);
      setErrorMessage(false);
    }
  }
  const refreshToken = async (token) => {
    const url = "http://localhost:3000/users/tokens/refresh";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token); // Update the access token
      } else {
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.log("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userSignIn]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, setUserSignIn }}
    >
      {errorMessage && (
        <div className="w-full">
          <div className="rounded-xl left-1/2 -translate-x-1/2 bg-white p-5 text-red-700 border-red-400 absolute mt-5 max-w-sm mx-auto">
            {errorMessage}
          </div>
        </div>
      )}
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
