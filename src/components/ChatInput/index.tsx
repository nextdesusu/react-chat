import React from "react";

import "./ChatInput.css";

interface ChatInputProps {
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  errorField?: string;
}

export default function ChatInput({
  onInput,
  label,
  placeholder,
  errorField,
}: ChatInputProps) {
  return (
    <div className="chat_input-container">
      <label>
        <input
          className="chat_input-input"
          placeholder={placeholder}
          onInput={onInput}
        />
        {label}
      </label>
      <span className="chat_input-error_field">{errorField}</span>
    </div>
  );
}
