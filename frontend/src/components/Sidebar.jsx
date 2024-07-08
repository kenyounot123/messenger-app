import { SettingsIcon, ChatIcon, Search2Icon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
export default function Sidebar({ setClickedPage, currentChatUser, userData }) {
  function handleIconClick(e) {
    const button = e.target.closest("button");
    const icon = button ? button.id : null;
    if (icon === "chatIcon" && currentChatUser !== null) {
      setClickedPage("messages");
    } else if (icon === "searchIcon") {
      setClickedPage("explore");
    } else {
      return;
    }
  }
  return (
    <div className="flex items-center lg:flex-col gap-10">
      <button className="text-center p-2">
        {" "}
        <UserAvatar name={userData.current_user.name} size="md" />
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
      <Link to={"/profile"}>
        <button id="settingIcon" className="text-center p-2">
          {" "}
          <SettingsIcon color="white" boxSize={30} />{" "}
        </button>
      </Link>
    </div>
  );
}
