import React, { useState } from "react";

interface SendMessageProps {
  onSendMessage?: (message: any) => void;
}

export default function SendMessage({ onSendMessage }: SendMessageProps) {
  const [messageText, setMessageText] = useState<string>("");
  const getTextInput = (event: any) => setMessageText(event.target.value);
  return (
    <div>
      <textarea onInput={getTextInput}></textarea>
      <button onClick={() => onSendMessage? onSendMessage(messageText): null}>send message</button>
    </div>
  );
}
