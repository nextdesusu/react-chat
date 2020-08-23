import io from 'socket.io-client';

import { ChatMessage, ChatUser, ChatAPIArgs, ChatAPICallbackFunction } from "./types";

const errorMessage: ChatMessage = {
    date: new Date(),
    text: "error",
    author: "error"
};

interface socketData {
    nickname?: string;
    socket?: string;
    messages?: Array<ChatMessage>;
    message?: ChatMessage;
    users?: Array<ChatUser>;
    chatRoom?: string;
}

export default class ChatAPI {
    private socket: SocketIOClient.Socket;
    private channel: string;
    private user: string;
    private users: Array<ChatUser>;
    private messages: Array<ChatMessage>;
    private onMessagesUpdate: ChatAPICallbackFunction;
    private onUsersUpdate: ChatAPICallbackFunction;
    constructor({ userName, onMessagesUpdate, onUsersUpdate, channel }: ChatAPIArgs) {
        this.user = userName;
        this.onMessagesUpdate = onMessagesUpdate;
        this.onUsersUpdate = onUsersUpdate;
        this.channel = channel || "default11";
        this.socket = io.connect("http://localhost:3030");

        this.users = [];
        this.messages = [];
    }

    public start(): void {
        this.socket.on("connect", (): void => {
            console.log("connection start");
            this.socket.emit("chat-start", { chatRoom: this.channel, nickname: this.user });
            this.socket.on("chat-new-user", (data: socketData) => {
                this.users.push({ nickname: data.nickname || "error", socket: data.socket || "error" });
                this.onUsersUpdate(this.users);
                console.log("new-user", data.nickname);
            });
            this.socket.on("chat-fetch-info", (data: socketData) => {
                this.messages = data.messages || [];
                this.users = data.users || [];
                this.onMessagesUpdate(this.messages);
                this.onUsersUpdate(this.users);
                console.log("chat-fetch-info", data);
            });
            this.socket.on("chat-message", (data: socketData) => {
                this.messages.push(data.message || errorMessage);
                this.onMessagesUpdate(this.messages);
                console.log("chat-message", data.message);
            });
            this.socket.on("chat-user-disconnect", (data: socketData) => {
                console.log("user:", data, "leave");
            });
        });
    }

    public sendMessage(text: string): void {
        const data = { chatRoom: this.channel, nickname: this.user, text };
        this.socket.emit("chat-message", data);
    }
}