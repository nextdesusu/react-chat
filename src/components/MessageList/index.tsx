import React from "react";

import Message from "../Message";

import { ChatMessage } from "../../ChatAPI/types";

import "./Message.css";

interface MessageListProps {
  messages: Array<ChatMessage>;
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="message_list-container">
      <ul className="message_list-ul">
        {messages.map((message: ChatMessage, index: number) => (
          <Message key={index} author={message.author} date={message.date.toString()}>
            {message.text}
          </Message>
        ))}
      </ul>
    </div>
  );
}
