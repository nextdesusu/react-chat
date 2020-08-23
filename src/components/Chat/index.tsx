import React, { useEffect, useReducer, Reducer } from "react";

import UserList from "../UserList";
import SendMessage from "../SendMessage";
import MessageList from "../MessageList";

import ChatAPI from "../../ChatAPI";
import { ChatAPIArgs, ChatMessage, ChatUser } from "../../ChatAPI/types";

import "./style.css";

interface ChatProps {
  userName: string;
  channel: string;
}

interface ChatStore {
  messages: Array<ChatMessage>;
  users: Array<ChatUser>;
  chatConnection: ChatAPI | null;
}

const initialStore: ChatStore = {
  messages: [],
  users: [],
  chatConnection: null,
};

type Action =
  | { type: "new-users"; payload: Array<ChatUser> }
  | { type: "new-messages"; payload: Array<ChatMessage> }
  | { type: "new-chat-connection"; payload: ChatAPI };

type ChatReducer = Reducer<ChatStore, Action>;

export default function Chat({ userName, channel }: ChatProps) {
  const [store, dispatch] = useReducer<ChatReducer>((store, action) => {
    switch (action.type) {
      case "new-messages":
        return { ...store, messages: action.payload };
      case "new-users":
        return { ...store, users: action.payload };
      case "new-chat-connection":
        return { ...store, chatConnection: action.payload };
      default:
        return store;
    }
  }, initialStore);

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
    dispatch({ type: "new-chat-connection", payload: chatConnection });
  }, []);
  const { messages, users, chatConnection } = store;
  const sendMessage = (text: string) => {
    const trimmed: string = text.trim();
    if (trimmed === "") return;
    if (chatConnection) {
      chatConnection.sendMessage(trimmed);
    } else {
      throw Error("Connection failed!");
    }
  };
  return (
    <div className="chat-container">
      <UserList users={users} />
      <MessageList messages={messages} />
      <SendMessage onSendMessage={sendMessage} />
    </div>
  );
}
