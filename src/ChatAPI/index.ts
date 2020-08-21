import io from 'socket.io-client';

type callbackFunction = (data: any) => void;

interface socketData {
    nickname?: string;
    messages?: Array<any>;
    message?: string;
    users?: Array<any>;
}

export interface ChatAPIArgs {
    userName: string;
    onMessagesUpdate: callbackFunction;
    onUsersUpdate: callbackFunction;
    channel?: string;
};

export default class ChatAPI {
    private socket: any;
    private channel: string;
    private user: string;
    private users: Array<string>;
    private messages: Array<any>;
    private onMessagesUpdate: callbackFunction;
    private onUsersUpdate: callbackFunction;
    constructor({ userName, onMessagesUpdate, onUsersUpdate, channel }: ChatAPIArgs) {
        this.user = userName;
        this.onMessagesUpdate = onMessagesUpdate;
        this.onUsersUpdate = onUsersUpdate;
        this.channel = channel || "default";
        this.socket = io.connect("http://localhost:3030");

        this.users = [];
        this.messages = [];
    }

    public start(): void {
        this.socket.on("connect", (): void => {
            this.socket.emit("chat-start", { chatRoom: this.channel, nickname: this.user });
            this.socket.on("chat-new-user", (data: socketData) => {
                this.users.push(data.nickname || "");
                this.onUsersUpdate(this.users);
            })
            this.socket.on("chat-fetch-info", (data: socketData) => {
                this.messages = data.messages || [];
                this.users = data.users || [];
                this.onMessagesUpdate(this.messages);
                this.onUsersUpdate(this.users);
                console.log("chat-fetch-info", data);
            });
            this.socket.on("chat-message", (data: socketData) => {
                this.messages.push(data.message);
                this.onMessagesUpdate(this.messages);
                console.log("chat-message", data.message);
            });
        });
    }

    public sendMessage(text: string): void {
        const data = { chatRoom: this.channel, nickname: this.user, text };
        this.socket.emit("chat-message", data);
    }
}