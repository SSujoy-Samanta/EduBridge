import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { UserManager } from "./manager/userManager/user";
import http from "http";
import url from "url";
const app = express();
app.use(express.json());
const httpServer = app.listen(3001, () => {
  console.log("Server is listening on port 3001 ");
});

const wss = new WebSocketServer({ server: httpServer });
const userManager = new UserManager();
wss.on(
  "connection",
  function connection(
    ws: WebSocket & { roomName?: string; userId?: number },
    req: http.IncomingMessage,
  ) {
    const queryParams = url.parse(req.url || "", true).query;

    const roomName = queryParams.roomName?.toString();
    const userId = queryParams.userId?.toString();
    ws.on("error", console.error);
    if (roomName && userId) {
      ws.roomName = roomName;
      ws.userId = parseInt(userId);
      userManager.addUser(ws, parseInt(userId), roomName);
    }
    //   ws.on('message', function message(data: any) {
    //     const message = JSON.parse(data);

    //   });

    ws.on("close", async () => {
      const room = ws.roomName;
      const id = ws.userId;
      if (room && id) {
        userManager.removeUser(ws, id, room);
      }
    });
  },
);
