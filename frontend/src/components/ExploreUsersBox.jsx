import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import UserAvatar from "./UserAvatar";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
import { Form } from "react-router-dom";

export default function ExploreUsersBox({
  setClickedPage,
  setCurrentChatUser,
}) {
  const { userData, setUserData, loading } = useContext(UserContext);

  const handleChatClick = (clickedUser) => {
    setCurrentChatUser(clickedUser);
    createChatRoom(clickedUser);
    setClickedPage("messages");
  };

  const createChatRoom = async (user) => {
    const url = "http://localhost:3000/api/v1/chat_rooms";
    const currentUser = userData.current_user;
    const body = {
      chat_room: {
        user_ids: [user.id, currentUser.id],
      },
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    console.log("Created chat room:", responseData);
  };
  return (
    <>
      {loading ? (
        <Box padding="6" bg="white">
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
        </Box>
      ) : (
        <form>
          {userData.other_users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleChatClick(user)}
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
              <p className="text-nowrap font-bold text-end self-center">
                Chat with user!
              </p>
              <ArrowRightIcon className="self-center" color={"#7A7AF3"} />
            </div>
          ))}
        </form>
      )}
    </>
  );
}
