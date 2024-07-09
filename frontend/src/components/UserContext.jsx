import { createContext, useState, useEffect, useRef } from "react";
import FlashMessage from "./FlashMessage";
import { authEndPoints, endpoints } from "../helpers/apiEndpoints";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSignIn, setUserSignIn] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const firstUpdate = useRef(true);

  async function fetchData() {
    console.log(endpoints.users);
    const token = localStorage.getItem("token");
    const url = endpoints.users;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserData(data);
        setIsLoggedIn(true);
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
    if (firstUpdate.current) {
      firstUpdate.current = false; // Set to false after first render
      return;
    }
    fetchData();
  }, [userSignIn]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        setUserSignIn,
        isLoggedIn,
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
