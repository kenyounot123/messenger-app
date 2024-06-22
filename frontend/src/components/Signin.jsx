import { Link } from "react-router-dom";
export default function SigninForm() {
  return (
    <>
      <form className="flex w-1/2 flex-col">
        <label className="text-white" htmlFor="name">
          Username
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="name"
          type="text"
        />
        <label className="text-white" htmlFor="email">
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="email"
          type="email"
          placeholder="bob123@gmail.com"
        />
        <label className="text-white" htmlFor="password">
          Password
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="password"
          type="password"
        />
        <button
          className="text-white py-1 bg-messenger-blue rounded-md mt-5"
          type="submit"
        >
          {" "}
          Log In{" "}
        </button>
        <button
          className="text-white py-1 bg-[#FFB300] rounded-md mt-1"
          type="submit"
        >
          {" "}
          Log in as Guest{" "}
        </button>
      </form>
      <div className="flex gap-[12px] justify-center mt-1 w-full">
        <button className="text-white py-1 bg-messenger-blue rounded-md w-[24%]">
          {" "}
          Github{" "}
        </button>
        <button className="text-white py-1 bg-messenger-blue rounded-md w-[24%]">
          {" "}
          Google{" "}
        </button>
      </div>
      <p className="text-slate-700 mt-5">
        Dont have an account?{" "}
        <Link className="text-messenger-blue">Sign Up</Link>
      </p>
    </>
  );
}
