import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { authEndPoints } from "../helpers/apiEndpoints";
export default function Signout({ setUserData }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  const clearLocalStorage = () => {
    localStorage.clear();
  };
  const handleSignout = async () => {
    // this will send a POST request to an enpoint that will revoke the user's access token
    // then clear the authentication token stored in local storage
    const url = authEndPoints.revoke;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw Error(response.status);
    }
    setUserData(null);
    clearLocalStorage();
    navigate("/", { state: { status: "Successfully signed out" } });
  };
  return (
    <Button onClick={() => handleSignout()} size="md" colorScheme="red">
      Sign Out
    </Button>
  );
}
