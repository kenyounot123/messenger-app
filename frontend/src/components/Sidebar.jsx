import { SettingsIcon, ChatIcon, Icon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import UserAvatar from "./UserAvatar";
export default function Sidebar() {
  return (
    <div className="flex items-center lg:flex-col gap-10">
      <div className="text-center">
        {" "}
        <UserAvatar size="md" />
      </div>
      <div className="text-center">
        {" "}
        <ChatIcon color="white" boxSize={30} />{" "}
      </div>
      <div className="text-center">
        {" "}
        <Icon as={CgProfile} color="white" boxSize={30} />{" "}
      </div>
      <div className="text-center">
        {" "}
        <SettingsIcon color="white" boxSize={30} />{" "}
      </div>
    </div>
  );
}
