import UserAvatar from "./UserAvatar";
function PersonalChat({ user }) {
  return (
    <div className="p-5 text-xs flex gap-5">
      <UserAvatar size={"sm"} />
      <div className="grid grid-cols-5">
        {/* user.name */}
        <h1 className="text-nowrap font-bold col-span-2">Username </h1>
        <p className="text-nowrap text-end col-start-6">10:14am</p>
        {/* user's chatroom latest message */}
        <p className="text-nowrap col-start-1 col-span-3">
          This is the latest message
        </p>
      </div>
    </div>
  );
}
export default function Chat() {
  return (
    <div className="max-w-full min-h-full">
      <h1 className="m-5 text-2xl pb-5">Messages</h1>
      <p className="m-5 text-slate-500">All Chats</p>
      <PersonalChat />
      <PersonalChat />
      <PersonalChat />
      <PersonalChat />
      <PersonalChat />
    </div>
  );
}
