import { useContext } from "react";
import { UserContext } from "./UserContext";
export default function Message({ user, message }) {
  const { userData } = useContext(UserContext);
  return (
    <div className="p-2 grid grid-cols-2 grid-rows-6">
      <div className="col-start-2 row-start-6">
        <div className="flex justify-between">
          {/* user.name */}
          <p>Username</p>
          {/* Message.created */}
          <p>Message sent</p>
        </div>
        <p className="bg-messenger-blue text-white w-fit max-w-full px-4 py-1 rounded-md">
          {/* user.message */}
          Messagegreeeeeeeeee
        </p>
      </div>
    </div>
  );
}
