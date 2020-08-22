import React, { ReactNode } from "react";

interface MessageProps {
  children: ReactNode | string;
  author: string;
  date: string;
}

export default function Message({ children, author, date }: MessageProps) {
  return (
    <li>
      <h3>{author}</h3>
      <h4>{date}</h4>
      <p>{children}</p>
    </li>
  );
}
