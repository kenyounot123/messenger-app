import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSignIn, setUserSignIn] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:3000/api/v1/users";
      const token = localStorage.getItem("token");

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
        } else {
          console.log(response);
          console.error("Failed to fetch user data");
          // Handle unauthorized access or other errors here
        }
      } catch (error) {
        console.log("error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userSignIn]);
  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, setUserSignIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
