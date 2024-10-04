import { WebSocket } from "ws";
import { RoomManager } from "../roomManager/room";
export interface User {
  socket: WebSocket;
  id: number;
}
export class UserManager {
  private users: User[];
  private roomManager: RoomManager;
  constructor() {
    this.users = [];
    this.roomManager = new RoomManager();
  }
  addUser(socket: WebSocket, id: number, roomName: string) {
    this.users.push({
      socket,
      id,
    });
    const user: User = {
      socket,
      id,
    };
    user.socket.send(JSON.stringify({ type: "lobby" }));
    const room = this.roomManager.addUserToRoom(user, roomName);
    this.initHandlers(socket);
  }
  removeUser(socket: WebSocket, id: number, roomName: string) {
    this.users = this.users.filter((x) => x.id !== id);
    const user: User = {
      socket,
      id,
    };
    const remove = this.roomManager.removeUserFromRoom(user, roomName);
    if (remove) {
      console.log(`userId ${id} left from ${roomName} room`);
    }
    const deleted = this.roomManager.deleteRoom(roomName);
    if (deleted) {
      console.log(`room ${roomName} Deleted`);
    }
  }
  initHandlers(socket: WebSocket) {
    socket.on("message", (message: string) => {
      try {
        const parsedMessage = JSON.parse(message);
        const { sdp, roomName, senderId, candidate, types } = parsedMessage;
        switch (parsedMessage.type) {
          case "createOffer":
            this.roomManager.onCreateOffer(roomName, sdp, senderId);
            break;
          case "createAnswer":
            this.roomManager.onAnswer(roomName, sdp, senderId);
            break;
          case "add-ice-candidate":
            this.roomManager.onIceCandidates(
              roomName,
              senderId,
              candidate,
              types,
            );
            break;
          default:
            console.log("Unknown message type:", parsedMessage.type);
        }
      } catch (error) {
        console.error("Failed to handle WebSocket message:", error);
      }
    });
    // socket.on('close', () => {
    //     console.log('Socket connection closed');
    // });

    // socket.on('error', (error: Error) => {
    //     console.error('WebSocket error:', error);
    // });
  }
}
