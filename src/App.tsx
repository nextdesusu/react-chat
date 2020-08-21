import React from 'react';
import ChatAPI, { ChatAPIArgs } from "./ChatAPI";
import './App.css';

function App() {
  const onFunc = (arg: Array<any>) => {
    console.log(arg);
  }
  const args: ChatAPIArgs = {
    userName: "",
    onMessagesUpdate: onFunc,
    onUsersUpdate: onFunc
  };
  const CA = new ChatAPI(args);
  CA.start();
  return (
    <h1>Works!</h1>
  );
}

export default App;
