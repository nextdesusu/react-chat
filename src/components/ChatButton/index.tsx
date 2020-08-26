import React from "react";

import "./ChatButton.css";

interface ChatButtonProps {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function ChatButton({
  onClick,
  children,
  disabled,
}: ChatButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick} className="chat-button">
      {children}
    </button>
  );
}
