import React, { ReactNode } from "react";

import Message from "../Message";

interface MessageListProps {
  messages: Array<any>;
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div>
      <ul>
        {messages.map((message: any) => (
          <Message author={message.author} date={message.date}>
            {message.text}
          </Message>
        ))}
      </ul>
    </div>
  );
}
