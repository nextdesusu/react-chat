import React from "react";

import { ChatUser } from "../../ChatAPI/types";

interface UserList {
  users: Array<ChatUser>;
}

export default function UserList({ users }: UserList) {
  return (
    <div>
      <ul>
        {users.map((user: ChatUser, index: number) => {
          return <li key={index}>{user.nickname}</li>;
        })}
      </ul>
    </div>
  );
}
