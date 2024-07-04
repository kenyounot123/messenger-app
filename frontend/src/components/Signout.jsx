import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Signout() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  const handleSignout = async () => {
    // this will send a POST request to an enpoint that will revoke the user's access token
    // then clear the authentication token stored in local storage
    const url = "http://localhost:3000/users/tokens/revoke";
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
    navigate("/root");
  };
  return (
    <Button onClick={() => handleSignout()} size="md" colorScheme="red">
      Sign Out
    </Button>
  );
}
