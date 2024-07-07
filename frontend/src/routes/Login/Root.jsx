import { useEffect, useState, useContext } from "react";
import SigninForm from "../../components/Signin";
import SignupForm from "../../components/Signup";
import { UserContext } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [formAuth, setFormAuth] = useState("login");

  useEffect(() => {
    if (userData) {
      navigate("/home");
    }
  }, [navigate, userData]);

  return (
    <>
      {!userData && (
        <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-top to-gradient-bot">
          <div className="flex flex-col gap-16">
            <h1 className="text-center text-white text-5xl">
              Welcome to <span className="text-messenger-blue">Message</span>{" "}
              App
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
      )}
    </>
  );
}
