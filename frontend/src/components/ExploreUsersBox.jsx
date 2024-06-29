import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import UserAvatar from "./UserAvatar";

export default function ExploreUsersBox() {
  const { userData, setUserData, loading } = useContext(UserContext);
  return (
    <>
      {loading ? (
        <h2>🌀 Loading...</h2>
      ) : (
        userData.other_users.map((user) => (
          <div
            key={user.id}
            className="m-5 p-2 text-xs flex gap-5 border-b rounded-md hover:bg-slate-200"
          >
            <UserAvatar size={"md"} name={user.name} />
            <div className="grid grid-cols-2 grow">
              <h1 className="text-xl text-nowrap font-bold col-span-2">
                {user.name}{" "}
              </h1>
              <p className="text-nowrap col-start-1 col-span-2">
                Joined on {user.joined_on}
              </p>
            </div>
            <p className="text-nowrap text-end self-center">Click to Chat</p>
          </div>
        ))
      )}
    </>
  );
}
