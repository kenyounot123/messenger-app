import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
export default function ExploreUsersBox() {
  const { userData, setUserData } = useContext(UserContext);
  return (
    <div className="m-5 flex flex-col">
      <div className="flex mb-5 border-b-2 pb-5">
        {/* user.status and user.name */}
        <div className="grid grid-rows-2 grow">
          <p className="font-bold">{userData.current_user.name}</p>
          <p>Online</p>
        </div>
        <div className="flex gap-10"></div>
      </div>
    </div>
  );
}
