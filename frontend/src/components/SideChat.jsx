import UserAvatar from "./UserAvatar";
import ListUsers from "./ListUsers";
import { useEffect } from "react";
function PersonalChat({ user, onClick }) {
  return (
    <div
      onClick={onClick}
      className="m-5 p-2 text-xs flex gap-5 border-b rounded-md hover:bg-slate-200"
    >
      <UserAvatar name={user.name} size={"sm"} />
      <div className="grid grid-cols-5">
        {/* user.name */}
        <h1 className="text-nowrap font-bold col-span-2">{user.name}</h1>
        {/* user.message.lastSent */}
        <p className="text-nowrap text-end col-start-6">10:14am</p>
        {/* user's chatroom latest message */}
        <p className="text-nowrap col-start-1 col-span-3">New message !</p>
      </div>
    </div>
  );
}
export default function SideChat({
  userData,
  loading,
  setClickedPage,
  setCurrentChatUser,
}) {
  useEffect(() => {});

  const getLatestMessageInChat = (chatRoom) => {};

  const handleChatClick = (clickedUser) => {
    setCurrentChatUser(clickedUser);
    setClickedPage("messages");
  };

  return (
    <div className="max-w-full min-h-full">
      <h1 className="m-5 text-2xl pb-5">Messages</h1>
      <p className="m-5 text-slate-500">All Chats</p>
      <ListUsers loading={loading}>
        {userData &&
          userData.other_users.map((user) => {
            return (
              <PersonalChat
                key={user.id}
                onClick={() => handleChatClick(user)}
                user={user}
              />
            );
          })}
      </ListUsers>
    </div>
  );
}
