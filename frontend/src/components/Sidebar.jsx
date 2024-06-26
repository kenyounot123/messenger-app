import { SettingsIcon, ChatIcon, Icon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
export default function Sidebar() {
  return (
    <div className="flex flex-col">
      <div className="text-center">
        {" "}
        <SettingsIcon boxSize={30} />{" "}
      </div>
      <div className="text-center">
        {" "}
        <ChatIcon boxSize={30} />{" "}
      </div>
      <div className="text-center">
        {" "}
        <Icon as={CgProfile} boxSize={30} />{" "}
      </div>
    </div>
  );
}
