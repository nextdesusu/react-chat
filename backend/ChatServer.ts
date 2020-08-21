import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer, Server } from "http";

export default class ChatServer {
    private app: Application;
    private httpServer: HTTPServer;
    private socketServer: SocketIOServer;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.socketServer = new socketIO(this.httpServer);
        this.port = port;
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.port, () =>
            callback(this.port)
        );
    }
}