import { createContext, useState, useEffect } from "react";
import FlashMessage from "./FlashMessage";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSignIn, setUserSignIn] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
      } else if (response.status === 401) {
        // This correct behavior
        // setErrorMessage("Your session has expired. Please sign in again.");
      }
    } catch (error) {
      console.log("Error fetching user data: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [userSignIn]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        setUserSignIn,
      }}
    >
      {errorMessage && (
        <FlashMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
