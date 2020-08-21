import ChatServer from "./ChatServer";

const DEFAULT_PORT: number = 3030;

const Server: ChatServer = new ChatServer(DEFAULT_PORT);

Server.listen((port: number) => {
    console.log(`Server is listening on http://localhost:${port}`);
});

