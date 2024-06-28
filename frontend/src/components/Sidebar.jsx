import { SettingsIcon, ChatIcon, Icon, Search2Icon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import UserAvatar from "./UserAvatar";
export default function Sidebar() {
  return (
    <div className="flex items-center lg:flex-col gap-10">
      <button className="text-center">
        {" "}
        <UserAvatar size="md" />
      </button>
      <button className="text-center">
        {" "}
        <ChatIcon color="white" boxSize={30} />{" "}
      </button>
      <button className="text-center">
        {" "}
        <Search2Icon color="white" boxSize={30} />{" "}
      </button>
      <button className="text-center">
        {" "}
        <SettingsIcon color="white" boxSize={30} />{" "}
      </button>
    </div>
  );
}
