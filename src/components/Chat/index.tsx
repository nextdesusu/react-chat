import React, { useState, useEffect } from "react";

import SendMessage from "../SendMessage";
import MessageList from "../MessageList";

import ChatAPI, { ChatAPIArgs } from "../../ChatAPI";

interface ChatProps {
  userName: string;
}

export default function Chat({ userName }: ChatProps) {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const [chatConnection, setChatConnector] = useState<ChatAPI | null>(null);

  useEffect(() => {
    const args: ChatAPIArgs = {
      userName,
      onMessagesUpdate: setMessages,
      onUsersUpdate: setUsers,
    };

    const CA = new ChatAPI(args);
    CA.start();
    setChatConnector(CA);
  }, []);
  console.log("messages:", messages);
  console.log("users:", users);
  return (
    <div>
      <MessageList messages={messages}/>
      <SendMessage
        onSendMessage={(text: string) => chatConnection?.sendMessage(text)}
      />
    </div>
  );
}
