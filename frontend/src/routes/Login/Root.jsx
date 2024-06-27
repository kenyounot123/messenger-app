import { useState } from "react";
import SigninForm from "../../components/Signin";
import SignupForm from "../../components/Signup";
export default function Login() {
  const [formAuth, setFormAuth] = useState("login");
  const toggleAuth = () => {
    setFormAuth(
      formAuth === "login" ? setFormAuth("signup") : setFormAuth("login")
    );
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-top to-gradient-bot">
      <div className="flex flex-col gap-16">
        <h1 className="text-center text-white text-5xl">
          Welcome to <span className="text-messenger-blue">Message</span> App
        </h1>
        <div className="flex flex-col border-2 border-accent-color justify-center items-center bg-gradient-to-b from-gradient-box-top to-gradient-box-bot self-center w-full bg-black rounded-xl min-h-96">
          {formAuth === "login" ? (
            <SigninForm setFormAuth={setFormAuth} />
          ) : (
            <SignupForm setFormAuth={setFormAuth} />
          )}
        </div>
      </div>
    </div>
  );
}
