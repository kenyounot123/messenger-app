import { FormControl, Input, Textarea } from "@chakra-ui/react";
import { PhoneIcon, BellIcon, SettingsIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "./UserContext";
import UserAvatar from "./UserAvatar";
import Message from "./Message";
export default function ChatWindow({ currentChatUser, chatRoom }) {
  const [messageData, setMessageData] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const { userData } = useContext(UserContext);
  const currentSignedInUser = userData.current_user;
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (chatRoom) {
      const ws = new WebSocket(
        `ws://localhost:3000/cable?token=${accessToken}`
      );
      // Handle WebSocket connection open
      ws.onopen = () => {
        console.log("Connected to WebSocket");

        // Subscribe to the chat room
        const msg = {
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "ChatRoomChannel",
            chat_room_id: chatRoom.id,
          }),
        };
        console.log(msg);
        ws.send(JSON.stringify(msg));
      };

      fetchMessagesInChat(chatRoom);
    }
  }, [chatRoom]);

  const fetchMessagesInChat = async (chatRoom) => {
    const url = `http://localhost:3000/api/v1/messages?chat_room_id=${chatRoom.id}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Failed to save message");
    }
    const data = await response.json();
    console.log(data);
    setMessageData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save message to database
    const body = {
      content: messageInput,
      chat_room_id: chatRoom.id,
      sender_id: currentSignedInUser.id,
    };

    const url = "http://localhost:3000/api/v1/messages";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      setMessageInput(""); // Clear the message input field on success
    } else {
      console.error("Failed to save message");
      // Handle error cases here
    }
  };

  const handleMessageInput = (e) => {
    const msg = e.target.value;
    setMessageInput(msg);
  };
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
      <div className="grow rounded-md bg-slate-200 h-full p-2 text-wrap gap-y-2.5 overflow-y-auto flex flex-col justify-end">
        {/* if message.user === current_signed_in_user then render message on the right side */}
        <Message userSignedInMessage={false} message={"afwefawefwe"} />
        <Message userSignedInMessage={true} message={"afwefawefwe123123"} />
        <Message userSignedInMessage={true} message={"afwefawefwe123123"} />
        <Message userSignedInMessage={false} message={"afwefawefwe123123"} />
      </div>
      {/* Input Here */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative flex gap-2 items-center"
      >
        <Input
          id="messageContent"
          className="text-4xl"
          onChange={(e) => handleMessageInput(e)}
          placeholder="Type your message here"
        />
        <Button type="submit" color="white" bg="#7A7AF3">
          Send
        </Button>
      </form>
    </div>
  );
}
