import { Input } from "@chakra-ui/react";
import { PhoneIcon, BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useState, useMemo } from "react";
import { Spinner } from "@chakra-ui/react";

import { UserContext } from "./UserContext";
import UserAvatar from "./UserAvatar";
import Message from "./Message";
import { endpoints, webSocketURL } from "../helpers/apiEndpoints";
export default function ChatWindow({ currentChatUser }) {
  const [chatRoom, setChatRoom] = useState(null);
  const [chatLoading, setChatLoading] = useState(true);
  const [messageData, setMessageData] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const { userData } = useContext(UserContext);
  const currentSignedInUser = userData.current_user;
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    createChatRoom(currentChatUser);
  }, [currentChatUser]);

  useEffect(() => {
    let ws;
    if (chatRoom) {
      ws = new WebSocket(`${webSocketURL}?token=${accessToken}`);
      // Handle WebSocket connection open
      ws.onopen = () => {
        // Subscribe to the chat room
        const msg = {
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "ChatRoomChannel",
            chat_room_id: chatRoom.id,
          }),
        };
        ws.send(JSON.stringify(msg));
      };
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.type === "ping") {
          return;
        }
        if (response.message) {
          const message = response.message;

          setMessageData((prevData) => ({
            ...prevData,
            messages: [...prevData.messages, message],
          }));
        }
      };
    }
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [chatRoom, accessToken]);

  const renderedMessages = useMemo(() => {
    return (
      messageData &&
      messageData.messages.map((message) => (
        <Message
          key={message.id}
          senderId={message.sender_id}
          userSignedInMessage={message.sender_id === currentSignedInUser.id}
          message={message.content}
          timeSent={message.created_at}
        />
      ))
    );
  }, [messageData, currentSignedInUser.id]);

  const createChatRoom = async (user) => {
    const url = endpoints.chatRooms;
    const currentUser = userData.current_user;
    const body = {
      chat_room: {
        user_ids: [user.id, currentUser.id],
      },
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const chatRoomData = await response.json();
      fetchMessagesInChat(chatRoomData);
      setChatRoom(chatRoomData);
    }
  };

  const fetchMessagesInChat = async (chatRoom) => {
    const url = `${endpoints.messages}?chat_room_id=${chatRoom.id}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Failed to save message");
    }
    const data = await response.json();
    setChatLoading(false);
    setMessageData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageInput === "") {
      return;
    }
    // Save message to database
    const body = {
      content: messageInput,
      chat_room_id: chatRoom.id,
      sender_id: currentSignedInUser.id,
    };

    const url = endpoints.messages;
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
      <div className="relative grow-0 rounded-md bg-slate-200 h-full p-2 gap-y-2.5 overflow-y-auto flex flex-col flex-row-reverse">
        {chatLoading && (
          <Spinner
            className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.300"
            color="#7A7AF3"
            size="xl"
          />
        )}
        {/* if message.user === current_signed_in_user then render message on the right side */}
        {renderedMessages}
      </div>
      {/* Input Here */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative flex gap-2 items-center"
      >
        <Input
          id="messageContent"
          className="text-4xl"
          value={messageInput}
          onChange={(e) => handleMessageInput(e)}
          placeholder={
            userData.current_user.guest
              ? "Sign Up to message other Users"
              : "Type your message here"
          }
          disabled={userData.current_user.guest}
        />
        <Button type="submit" color="white" bg="#7A7AF3">
          Send
        </Button>
      </form>
    </div>
  );
}
