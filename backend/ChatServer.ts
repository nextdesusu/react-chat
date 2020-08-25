import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer, Server } from "http";

interface socketData {
    nickname?: string;
    chatRoom?: string;
}

interface userType {
    socket: string;
    nickname: string;
}

interface messageType {
    date: Date;
    author: userType;
    text: string;
}

interface chatRoom {
    users: Array<userType>;
    messages: Array<messageType>;
}

interface roomsType {
    [key: string]: chatRoom;
}

interface roomsBySocket {
    [key: string]: string;
}

export default class ChatServer {
    private app: Application;
    private httpServer: HTTPServer;
    private socketServer: SocketIOServer;
    private port: number;
    private rooms: roomsType;
    private activeUsers: roomsBySocket;

    constructor(port: number) {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.socketServer = new socketIO(this.httpServer);
        this.port = port;

        this.rooms = {};
        this.activeUsers = {};
        this.handleSockets();
    }

    private getRoom(roomName: string): chatRoom {
        if (this.rooms[roomName] === undefined) {
            this.rooms[roomName] = { users: [], messages: [] };
        }
        return this.rooms[roomName];
    }

    private assignUser(roomName: string, user: userType): void {
        const room: chatRoom = this.getRoom(roomName);
        room.users.push(user);

        this.activeUsers[user.socket] = roomName;
    }

    private unassignUser(userSocket: string): void {
        const room = this.getRoom(this.activeUsers[userSocket]);
        room.users = room.users.filter(
            (user: userType) => user.socket !== userSocket
        );

        delete this.activeUsers[userSocket];
    }


    private handleSockets(): void {
        this.socketServer.on("connect", (socketClient): void => {
            socketClient.on("chat-start", (data: any) => {
                const { chatRoom, nickname } = data;
                socketClient.join(chatRoom);

                const newUser: userType = {
                    nickname,
                    socket: socketClient.id,
                };
                socketClient.broadcast.to(chatRoom).emit("chat-new-user", { user: newUser });
                this.assignUser(chatRoom, newUser);

                const { users, messages } = this.getRoom(chatRoom);
                this.socketServer.to(socketClient.id).emit("chat-fetch-info", {
                    messages,
                    users
                });
            });
            socketClient.on("chat-message", (data: any) => {
                const { text, nickname, chatRoom } = data;
                const message = {
                    date: new Date(),
                    text: text.trim(),
                    author: nickname
                };

                const room = this.getRoom(chatRoom);
                room.messages.push(message);

                const response = {
                    nickname,
                    message
                };
                socketClient.broadcast.to(data.chatRoom).emit("chat-message", response);
                this.socketServer.to(socketClient.id).emit("chat-message", response);
            });
            socketClient.on("disconnect", (): void => {
                const roomName = this.activeUsers[socketClient.id];
                const leavingUser: userType | undefined = this.getRoom(roomName).users.find(
                    (user: userType) => user.socket === socketClient.id
                );
                this.unassignUser(socketClient.id);
                this.socketServer.to(roomName).emit("chat-user-disconnect", leavingUser);
            })
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.port, () =>
            callback(this.port)
        );
    }
}