import React, { useState } from "react";

import ChatButton from "../ChatButton";

import "./SendMessage.css";

interface SendMessageProps {
  onSendMessage: (message: any) => void;
}

export default function SendMessage({ onSendMessage }: SendMessageProps) {
  const [messageText, setMessageText] = useState<string>("");
  const getTextInput = (event: any) => setMessageText(event.target.value);
  return (
    <div className="send_message-container">
      <textarea className="send_message-textarea" onChange={getTextInput} value={messageText}></textarea>
      <ChatButton
        onClick={() => {
          onSendMessage(messageText);
          setMessageText("");
        }}
      >
        send message
      </ChatButton>
    </div>
  );
}
