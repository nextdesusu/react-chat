import React, { ReactNode } from "react";

import "./Message.css";

interface MessageProps {
  children: ReactNode | string;
  author: string;
  date: string;
}

export default function Message({ children, author, date }: MessageProps) {
  return (
    <li className="message-container">
      <h3 className="message-author">Author: {author}</h3>
      <h4 className="message-date">Date: {date}</h4>
      <p className="message-text">{children}</p>
    </li>
  );
}
