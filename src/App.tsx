import React, { useReducer, Reducer } from "react";

import {
  validateUserName,
  validateChannel,
  validationResult,
  vfType,
} from "./ChatAPI/validation";

import PopupMenu from "./components/PopupMenu";
import Chat from "./components/Chat";
import ChatButton from "./components/ChatButton";
import ChatInput from "./components/ChatInput";

import "./App.css";

interface AppStore {
  channel: string;
  userName: string;
  shouldProceed: boolean;
  userNameError?: string;
  channelError?: string;
}

type cbType = (value: string) => void;

type Action =
  | { type: "set-channel"; payload: string }
  | { type: "set-user-name"; payload: string }
  | { type: "proceed"; payload: true };

type ChatReducer = Reducer<AppStore, Action>;

const initialStore: AppStore = {
  channel: "",
  userName: "",
  shouldProceed: false,
};

function App() {
  const [store, dispatch] = useReducer<ChatReducer>(
    (store: AppStore, action: Action) => {
      switch (action.type) {
        case "set-channel":
          return { ...store, channel: action.payload };
        case "set-user-name":
          return { ...store, userName: action.payload };
        case "proceed":
          return { ...store, shouldProceed: action.payload };
        default:
          return store;
      }
    },
    initialStore
  );

  const inputHandler = (cb: cbType) => (
    event: React.FormEvent<HTMLInputElement>
  ) => cb((event.target as HTMLInputElement).value);

  const setChannel = (channel: string) => {
    const vs: validationResult = validateChannel(channel);
    if (vs.error) {

    } else {
      dispatch({ type: "set-channel", payload: channel });
    }
  };
  const setUserName = (userName: string) =>
    dispatch({ type: "set-user-name", payload: userName });

  const { userName, channel, shouldProceed } = store;

  return (
    <section className="app-container">
      {!shouldProceed ? (
        <PopupMenu subClass={"grid-template-3"}>
          <ChatInput onInput={inputHandler(setChannel)} placeholder="channel" />
          <ChatInput
            onInput={inputHandler(setUserName)}
            placeholder="user name"
          />
          <ChatButton
            onClick={() => dispatch({ type: "proceed", payload: true })}
          >
            Proceed
          </ChatButton>
        </PopupMenu>
      ) : (
        <Chat channel={channel} userName={userName} />
      )}
    </section>
  );
}

export default App;
