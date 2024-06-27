import { Textarea } from "@chakra-ui/react";
import { PhoneIcon, BellIcon, SettingsIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import UserAvatar from "./UserAvatar";
export default function MessageBox({ user }) {
  return (
    <div className="m-5 flex flex-col">
      <div className="flex items-center mb-5 gap-5 border-b-2 pb-5">
        <UserAvatar size={"md"} />
        {/* user.status and user.name */}
        <div className="grid grid-rows-2 grow">
          <p className="font-bold">User Name</p>
          <p>Online</p>
        </div>
        <div className="flex gap-10">
          <PhoneIcon color={"#7A7AF3"} boxSize={6} />
          <BellIcon color={"#7A7AF3"} boxSize={6} />
          <SettingsIcon color={"#7A7AF3"} boxSize={6} />
        </div>
      </div>
      {/* Chat messages here */}
      <div className="grow rounded-md min-h-5/6">fawefawef</div>
      {/* Input Here */}
      <div className="relative flex gap-2 items-center">
        <Textarea
          size={"sm"}
          resize={"none"}
          placeholder="Type your message here"
        />
        <Button className="" color="white" bg="#7A7AF3">
          Send
        </Button>
      </div>
    </div>
  );
}
