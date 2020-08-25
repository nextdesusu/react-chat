import React from "react";

import { ChatUser } from "../../ChatAPI/types";

import "./UserList.css";

interface UserList {
  users: Array<ChatUser>;
}

export default function UserList({ users }: UserList) {
  return (
    <div className="user_list-container">
      <ul className="user-list-ul">
        {users.map((user: ChatUser, index: number) => {
          return <li className="user_list-item" key={index}>{user.nickname}</li>;
        })}
      </ul>
    </div>
  );
}
