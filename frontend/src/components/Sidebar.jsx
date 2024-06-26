import { SettingsIcon, ChatIcon, Icon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
export default function Sidebar() {
  return (
    <div className="flex lg:flex-col gap-10">
      <div className="text-center">
        {" "}
        <ChatIcon boxSize={30} />{" "}
      </div>
      <div className="text-center">
        {" "}
        <SettingsIcon boxSize={30} />{" "}
      </div>
      <div className="text-center">
        {" "}
        <Icon as={CgProfile} boxSize={30} />{" "}
      </div>
    </div>
  );
}
