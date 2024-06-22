import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-black to-gradient-grey">
      <div className="flex flex-col gap-16">
        <h1 className="text-center text-white text-5xl">
          Welcome to <span className="text-messenger-blue">Message</span> App
        </h1>
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-gradient-box-grey to-gradient-box-white self-center w-full bg-black rounded-xl min-h-96">
          <form className="flex w-1/2 flex-col">
            <label htmlFor="email">Email</label>
            <input className="py-1 rounded-md" id="email" type="email" />
            <label htmlFor="password">Password</label>
            <input className="py-1 rounded-md" id="password" type="password" />
            <button
              className="text-white py-1 bg-messenger-blue rounded-md mt-5"
              type="submit"
            >
              {" "}
              Log In{" "}
            </button>
          </form>
          <div className="flex gap-[5px] justify-center mt-1 w-full">
            <button className="text-white py-1 bg-messenger-blue rounded-md w-1/4">
              {" "}
              Github{" "}
            </button>
            <button className="text-white py-1 bg-messenger-blue rounded-md w-1/4">
              {" "}
              Google{" "}
            </button>
          </div>
          <p className="text-slate-700 mt-5">
            Dont have an account?{" "}
            <Link className="text-messenger-blue">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
