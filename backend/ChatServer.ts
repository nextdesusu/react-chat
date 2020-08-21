import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer, Server } from "http";

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
    private sockets: roomsBySocket;

    constructor(port: number) {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.socketServer = new socketIO(this.httpServer);
        this.port = port;

        this.rooms = {};
        this.sockets = {};
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

        this.sockets[user.socket] = roomName;
    }


    private handleSockets(): void {
        this.socketServer.on("connect", (socketClient): void => {
            socketClient.on("chat-start", (data: any) => {
                console.log("join:", socketClient.id)
                const user: userType = {
                    nickname: data.nickname,
                    socket: socketClient.id,
                };
                this.assignUser(data.chatRoom, user);
            });
            socketClient.on("disconnect", (): void => {
                console.log(socketClient.id, "leaving:", this.sockets[socketClient.id]);
            })
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.port, () =>
            callback(this.port)
        );
    }
}