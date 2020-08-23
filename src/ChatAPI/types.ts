export interface ChatMessage {
    date: Date,
    text: string;
    author: string;
}

export interface ChatUser {
    socket: string;
    nickname: string;
}

export type ChatAPICallbackFunction = (value: any) => void;

export interface ChatAPIArgs {
    userName: string;
    onMessagesUpdate: ChatAPICallbackFunction;
    onUsersUpdate: ChatAPICallbackFunction;
    channel?: string;
};