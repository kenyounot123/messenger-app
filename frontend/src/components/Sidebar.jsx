import { SettingsIcon, ChatIcon, Icon, Search2Icon } from "@chakra-ui/icons";
import UserAvatar from "./UserAvatar";
export default function Sidebar({ setClickedPage }) {
  function handleIconClick(e) {
    const button = e.target.closest("button");
    const icon = button ? button.id : null;
    if (icon === "chatIcon") {
      setClickedPage("messages");
    } else if (icon === "searchIcon") {
      setClickedPage("explore");
    } else if (icon === "settingIcon") {
      setClickedPage("profile");
    } else {
      return;
    }
  }
  return (
    <div className="flex items-center lg:flex-col gap-10">
      <button className="text-center p-2">
        {" "}
        <UserAvatar size="md" />
      </button>
      <button
        id="chatIcon"
        className="text-center p-2"
        onClick={(e) => handleIconClick(e)}
      >
        {" "}
        <ChatIcon color="white" boxSize={30} />{" "}
      </button>
      <button
        id="searchIcon"
        className="text-center p-2"
        onClick={(e) => handleIconClick(e)}
      >
        {" "}
        <Search2Icon color="white" boxSize={30} />{" "}
      </button>
      <button
        id="settingIcon"
        className="text-center p-2"
        onClick={(e) => handleIconClick(e)}
      >
        {" "}
        <SettingsIcon color="white" boxSize={30} />{" "}
      </button>
    </div>
  );
}
