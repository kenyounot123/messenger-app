import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { authEndPoints } from "../helpers/apiEndpoints";
import FlashMessage from "./FlashMessage";
export default function SigninForm({ setFormAuth }) {
  const navigate = useNavigate();
  const { setUserSignIn } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleGuestSignIn = async (e) => {
    e.preventDefault();
    const url = authEndPoints.signIn;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guest: true }), // Indicating a guest sign-in
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save the token in local storage
        setUserSignIn((prev) => prev + 1); // Trigger a re-fetch in the UserProvider
      } else {
        setErrorMsg("Failed to sign in as a guest.");
      }
    } catch (error) {
      setErrorMsg("Error during guest sign-in:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const url = authEndPoints.signIn;

    const { name, email, password } = formData;
    const body = { email, password };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem(
        "resource_owner",
        JSON.stringify(data.resource_owner)
      );
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("token", data.token);
      setUserSignIn((prev) => prev + 1);
      navigate("/home");
    } else {
      const errorResult = await response.json();
      setErrorMsg(errorResult.error_description);
    }
  };
  return (
    <>
      {errorMsg && (
        <FlashMessage errorMessage={errorMsg} setErrorMessage={setErrorMsg} />
      )}
      <form onSubmit={handleSignIn} className="flex w-1/2 flex-col">
        <label className="text-white" htmlFor="email">
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="email"
          type="email"
          placeholder="bob123@gmail.com"
          onChange={(e) => handleInput(e)}
        />
        <label className="text-white" htmlFor="password">
          Password
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="password"
          type="password"
          onChange={(e) => handleInput(e)}
        />
        <button
          className="text-white py-1 bg-messenger-blue rounded-md mt-5"
          type="submit"
        >
          {" "}
          Log In{" "}
        </button>
        <button
          onClick={(e) => handleGuestSignIn(e)}
          className="text-white py-1 bg-accent-color rounded-md mt-1"
        >
          {" "}
          Log in as Guest{" "}
        </button>
      </form>
      <p className="text-slate-700 mt-5">
        Dont have an account?{" "}
        <button
          onClick={() => setFormAuth("signup")}
          className="text-messenger-blue"
        >
          Sign Up
        </button>
      </p>
    </>
  );
}
