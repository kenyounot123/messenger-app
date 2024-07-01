import Chat from "../../components/Chat";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import ChatWindow from "../../components/ChatWindow";
import ExploreUsersBox from "../../components/ExploreUsersBox";

import { useState, useEffect, useContext } from "react";
import { UserContext, UserProvider } from "../../components/UserContext";

export default function Homepage() {
  // State to change the page displayed to user
  const [clickedPage, setClickedPage] = useState("explore");
  const [currentChatUser, setCurrentChatUser] = useState(null);
  return (
    <UserProvider>
      <div className="py-5 flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-top to-gradient-bot">
        <div className="p-5 gap-x-5 gap-y-3 grid grid-cols-12 grid-rows-12 w-11/12 bg-gradient-to-b from-gradient-box-top to-gradient-box-bot self-center min-h-96 max-h-full bg-black rounded-xl">
          <div className="flex justify-center items-center rounded-xl row-start-11 col-start-1 col-span-12 row-span-3 md:row-start-11 md:row-span-2 md:col-start-1 md:col-span-12 lg:col-start-1 lg:col-span-1 lg:row-span-12 bg-messenger-blue">
            <Sidebar setClickedPage={setClickedPage} />
          </div>
          <div className="col-span-12 md:col-span-12 lg:block lg:col-start-2 lg:col-span-3 rounded-xl">
            <SearchBar />
          </div>
          <div className="hidden lg:block lg:col-start-2 lg:col-span-3 lg:row-span-11 rounded-xl bg-white">
            <Chat />
          </div>
          <div className="col-span-12 row-span-9 rounded-xl md:row-span-9 md:col-span-12 md:row-start-2 md:col-start-1 lg:col-start-5 lg:row-span-12 lg:row-start-1 bg-white min-h-[500px]">
            <>
              {clickedPage === "explore" && (
                <ExploreUsersBox
                  setCurrentChatUser={setCurrentChatUser}
                  setClickedPage={setClickedPage}
                />
              )}
              {clickedPage === "profile" && (
                <Profile setClickedPage={setClickedPage} />
              )}
              {clickedPage === "messages" && (
                <ChatWindow
                  setClickedPage={setClickedPage}
                  currentChatUser={currentChatUser}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
