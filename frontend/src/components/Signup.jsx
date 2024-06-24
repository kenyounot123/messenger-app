import { Link } from "react-router-dom";
import { useState } from "react";
export default function SignupForm({ setFormAuth }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/users/tokens/sign_up";

    if (
      formData.name.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.confirmPassword.length === 0
    ) {
      alert("Empty field");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const body = {
      user: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleInput = (e) => {
    const { id, value } = e.target;
    // console.log(id);
    // console.log(value);
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
