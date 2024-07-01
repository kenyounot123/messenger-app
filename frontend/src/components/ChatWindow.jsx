import { FormControl, Input, Textarea } from "@chakra-ui/react";
import { PhoneIcon, BellIcon, SettingsIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useContext } from "react";

import { UserContext } from "./UserContext";
import UserAvatar from "./UserAvatar";
import Message from "./Message";
export default function ChatWindow({ currentChatUser }) {
  const { userData } = useContext(UserContext);
  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center gap-5 border-b-2 pb-5">
        <UserAvatar name={currentChatUser.name} size={"md"} />
        {/* user.status and user.name */}
        <div className="grid grid-rows-2 grow">
          <p className="font-bold">{currentChatUser.name}</p>
          <p>Online</p>
        </div>
        <div className="flex gap-10">
          <PhoneIcon color={"#7A7AF3"} boxSize={6} />
          <BellIcon color={"#7A7AF3"} boxSize={6} />
          <SettingsIcon color={"#7A7AF3"} boxSize={6} />
        </div>
      </div>
      {/* Chat messages here */}
      <div className="grow rounded-md max-h-96 bg-slate-100 h-full p-2 text-wrap gap-y-2.5 overflow-y-auto flex flex-col justify-end">
        {/* if message.user === current_signed_in_user then render message on the right side */}
        <Message userSignedInMessage={false} message={"afwefawefwe"} />
        <Message userSignedInMessage={true} message={"afwefawefwe123123"} />
        <Message userSignedInMessage={true} message={"afwefawefwe123123"} />
        <Message userSignedInMessage={false} message={"afwefawefwe123123"} />
      </div>
      {/* Input Here */}
      <FormControl className="relative flex gap-2 items-center">
        <Input className="text-4xl" placeholder="Type your message here" />
        <Button className="" color="white" bg="#7A7AF3">
          Send
        </Button>
      </FormControl>
    </div>
  );
}
