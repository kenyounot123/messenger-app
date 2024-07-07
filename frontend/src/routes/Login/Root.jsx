import { useEffect, useState, useContext } from "react";
import SigninForm from "../../components/Signin";
import SignupForm from "../../components/Signup";
import FlashMessage from "../../components/FlashMessage";
import { UserContext } from "../../components/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  let location = useLocation();
  const [formAuth, setFormAuth] = useState("login");
  const [flashMsg, setFlashMsg] = useState("");

  useEffect(() => {
    if (location.state) {
      setFlashMsg(location.state.status);
      window.history.replaceState({}, "");
      console.log(location.state);
    }
  }, [location.state]);

  return (
    <>
      {userData ? (
        navigate("/home")
      ) : (
        <>
          {flashMsg && (
            <FlashMessage
              errorMessage={flashMsg}
              setErrorMessage={setFlashMsg}
              textColor="text-green-400"
              borderColor="border-green-200"
              bgColor="bg-white"
            />
          )}
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
        </>
      )}
    </>
  );
}
