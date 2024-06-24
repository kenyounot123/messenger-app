import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignupForm({ setFormAuth }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accessToken, setAccessToken] = useState(null);

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token")
  );

  const [resourceOwner, setResourceOwner] = useState(null);

  // Storing authentication in local storage
  const handleAuthResponse = async (response) => {
    const data = await response.json();

    console.log(data);

    //   localStorage.setItem("resource_owner", JSON.stringify(data.resource_owner));
    //   localStorage.setItem("refresh_token", data.refresh_token);

    //   setAccessToken(data.token);
    //   setRefreshToken(data.refresh_token);
    //   setResourceOwner(data.resource_owner);
    // };
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/users/tokens/sign_up";
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert("Empty field");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const body = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // If form submission was successful then save refresh token to local storage
      // and direct user to log in form
      if (response.ok) {
        handleAuthResponse(response);
        setFormAuth("login");
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setFormAuth("login");
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  return (
    <>
      <form onSubmit={onSubmit} className="flex w-1/2 flex-col">
        <label className="text-white" htmlFor="name">
          Username
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="name"
          type="text"
          onChange={(e) => handleInput(e)}
        />
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
        <label className="text-white" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="confirmPassword"
          type="password"
          onChange={(e) => handleInput(e)}
        />
        <button
          className="text-white py-1 bg-messenger-blue rounded-md mt-5"
          type="submit"
        >
          {" "}
          Sign Up{" "}
        </button>
      </form>
      <p className="text-slate-700 mt-5">
        Already have an account?{" "}
        <button
          onClick={() => setFormAuth("login")}
          className="text-messenger-blue"
        >
          Sign In
        </button>
      </p>
    </>
  );
}
