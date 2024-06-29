import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:3000/api/v1/users";
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

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
          setLoading(false);
        } else {
          console.error("Failed to fetch user data");
          // Handle unauthorized access or other errors here
        }
      } catch (error) {
        console.log("error fetching user data: ", error);
      }
    }
    fetchData();
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
