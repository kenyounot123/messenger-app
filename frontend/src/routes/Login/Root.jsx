import { useState } from "react";
import SigninForm from "../../components/Signin";
import SignupForm from "../../components/Signup";
export default function Login() {
  const [auth, setAuth] = useState("signup");
  const toggleAuth = () => {
    setAuth(auth === "login" ? setAuth("signup") : setAuth("login"));
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-black to-gradient-grey">
      <div className="flex flex-col gap-16">
        <h1 className="text-center text-white text-5xl">
          Welcome to <span className="text-messenger-blue">Message</span> App
        </h1>
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-gradient-box-grey to-gradient-box-white self-center w-full bg-black rounded-xl min-h-96">
          {auth === "login" ? <SigninForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}
