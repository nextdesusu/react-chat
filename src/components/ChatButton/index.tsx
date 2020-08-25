import React from "react";

import "./ChatButton.css";

interface ChatButtonProps {
  children: string;
  onClick: () => void;
}

export default function ChatButton({ onClick, children }: ChatButtonProps) {
  return <button onClick={onClick} className="chat-button">{children}</button>;
}
