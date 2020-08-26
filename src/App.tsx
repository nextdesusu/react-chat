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
  errorUserName: string;
  errorChannel: string;
}

type cbType = (value: string) => void;

type Action =
  | { type: "set-channel"; payload: string }
  | { type: "set-user-name"; payload: string }
  | { type: "proceed"; payload: true }
  | { type: "error-channel"; payload: string }
  | { type: "error-user-name"; payload: string };

type ChatReducer = Reducer<AppStore, Action>;

const initialStore: AppStore = {
  channel: "",
  userName: "",
  shouldProceed: false,
  errorUserName: "Type user name",
  errorChannel: "Type channel name",
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
        case "error-channel":
          return { ...store, errorChannel: action.payload };
        case "error-user-name":
          return { ...store, errorUserName: action.payload };
        default:
          return store;
      }
    },
    initialStore
  );

  const inputHandler = (
    onInput: cbType,
    onError: cbType,
    validationFunc: vfType
  ) => (event: React.FormEvent<HTMLInputElement>) => {
    const input: string = (event.target as HTMLInputElement).value;
    const result: validationResult = validationFunc(input);
    if (!result.isValid) {
      onError(result.error || "");
    } else {
      onError("");
    }
    onInput(input);
  };

  const createDispatcher = (type: any) => (payload: string) =>
    dispatch({ type, payload });
  const setChannel = createDispatcher("set-channel");
  const setUserName = createDispatcher("set-user-name");
  const onSetChannelError = createDispatcher("error-channel");
  const onSetUserError = createDispatcher("error-user-name");

  const {
    userName,
    channel,
    shouldProceed,
    errorUserName,
    errorChannel,
  } = store;

  return (
    <section className="app-container">
      {!shouldProceed ? (
        <PopupMenu subClass={"grid-template-3"}>
          <ChatInput
            onInput={inputHandler(
              setChannel,
              onSetChannelError,
              validateChannel
            )}
            placeholder="channel"
            errorField={errorChannel}
          />
          <ChatInput
            onInput={inputHandler(
              setUserName,
              onSetUserError,
              validateUserName
            )}
            placeholder="user name"
            errorField={errorUserName}
          />
          <ChatButton
            disabled={Boolean(errorChannel.length || errorUserName.length)}
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
