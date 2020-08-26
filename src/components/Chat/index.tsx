import React, { useEffect, useReducer, useRef, Reducer } from "react";

import UserList from "../UserList";
import SendMessage from "../SendMessage";
import MessageList from "../MessageList";

import ChatAPI from "../../ChatAPI";
import { ChatAPIArgs, ChatMessage, ChatUser } from "../../ChatAPI/types";

import "./Chat.css";

interface ChatProps {
  userName: string;
  channel: string;
}

interface ChatStore {
  messages: Array<ChatMessage>;
  users: Array<ChatUser>;
}

const initialStore: ChatStore = {
  messages: [],
  users: [],
};

type Action =
  | { type: "new-users"; payload: Array<ChatUser> }
  | { type: "new-messages"; payload: Array<ChatMessage> };

type ChatReducer = Reducer<ChatStore, Action>;

export default function Chat({ userName, channel }: ChatProps) {
  const [store, dispatch] = useReducer<ChatReducer>((store, action) => {
    switch (action.type) {
      case "new-messages":
        return { ...store, messages: action.payload };
      case "new-users":
        return { ...store, users: action.payload };
      default:
        return store;
    }
  }, initialStore);

  const chatAPIConnection = useRef<ChatAPI | null>(null);

  useEffect(() => {
    const setMessages = (messages: Array<ChatMessage>) =>
      dispatch({ type: "new-messages", payload: messages });
    const setUsers = (users: Array<ChatUser>) =>
      dispatch({ type: "new-users", payload: users });

    const args: ChatAPIArgs = {
      userName,
      onMessagesUpdate: setMessages,
      onUsersUpdate: setUsers,
      channel,
    };

    const chatConnection = new ChatAPI(args);
    chatConnection.start();
    chatAPIConnection.current = chatConnection;
  }, []);
  const { messages, users } = store;
  const sendMessage = (text: string) => {
    const trimmed: string = text.trim();
    if (trimmed === "") return;
    if (chatAPIConnection.current !== null) {
      chatAPIConnection.current.sendMessage(trimmed);
    } else {
      throw Error("Connection failed!");
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-grid-2">
        <UserList users={users} />
        <MessageList messages={messages} />
      </div>
      <SendMessage onSendMessage={sendMessage} />
    </div>
  );
}
