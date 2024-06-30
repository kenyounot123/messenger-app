import { FormControl, Input, Textarea } from "@chakra-ui/react";
import { PhoneIcon, BellIcon, SettingsIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";

import UserAvatar from "./UserAvatar";
import Message from "./Message";
export default function ChatWindow({ user }) {
  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center  gap-5 border-b-2 pb-5">
        <UserAvatar name={user.name} size={"md"} />
        {/* user.status and user.name */}
        <div className="grid grid-rows-2 grow">
          <p className="font-bold">{user.name}</p>
          <p>Online</p>
        </div>
        <div className="flex gap-10">
          <PhoneIcon color={"#7A7AF3"} boxSize={6} />
          <BellIcon color={"#7A7AF3"} boxSize={6} />
          <SettingsIcon color={"#7A7AF3"} boxSize={6} />
        </div>
      </div>
      {/* Chat messages here */}
      <div className="grow rounded-md min-h-5/6 bg-slate-100">
        <Message />
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
