import { useContext } from "react";
import { UserContext } from "./UserContext";
export default function Message({
  senderId,
  message,
  timeSent,
  userSignedInMessage,
}) {
  const { userData } = useContext(UserContext);
  const getMessageSenderName = (sender_id) => {
    const sender = userData.other_users.find((user) => user.id === sender_id);
    return sender.name;
  };
  return (
    <div className={`${userSignedInMessage ? "self-end" : "self-start"}`}>
      {!userSignedInMessage ? (
        <>
          <div className="flex justify-between">
            {/* user.name */}
            {<p>{getMessageSenderName(senderId)}</p>}
            {/* Message.created */}
            <p>{timeSent}</p>
          </div>
          <p className="bg-white text-black w-fit max-w-48 px-4 py-1 rounded-md justify-self-end">
            {message}
          </p>
        </>
      ) : (
        <>
          <p className="text-end">{timeSent}</p>
          <p className="bg-messenger-blue text-white w-fit max-w-48 px-4 py-1 rounded-md justify-self-end">
            {message}
          </p>
        </>
      )}
    </div>
  );
}
