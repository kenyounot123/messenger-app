import { useContext } from "react";
import { UserContext } from "./UserContext";
import UserAvatar from "./UserAvatar";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

export default function ExploreUsersBox({
  setClickedPage,
  setCurrentChatUser,
}) {
  const { userData, loading } = useContext(UserContext);

  const handleChatClick = (clickedUser) => {
    setCurrentChatUser(clickedUser);
    setClickedPage("messages");
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
          {userData &&
            userData.other_users.map((user) => (
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
