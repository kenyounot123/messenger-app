import UserAvatar from "./UserAvatar";
import { ArrowRightIcon } from "@chakra-ui/icons";
import ListUsers from "./ListUsers";

export default function ExploreUsersBox({
  userData,
  loading,
  setClickedPage,
  setCurrentChatUser,
}) {
  const handleChatClick = (clickedUser) => {
    setCurrentChatUser(clickedUser);
    setClickedPage("messages");
  };

  return (
    <>
      <ListUsers loading={loading}>
        <h1 className="m-5 p-2 font-bold text-xl">All users</h1>
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
      </ListUsers>
    </>
  );
}
