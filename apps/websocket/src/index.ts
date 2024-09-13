import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { validateMessage, validateRoomName } from './utils/validInput';
import { addUserToRoom, createRoom, deleteEmptyRooms, findRoom, removeUserFromRoom } from './services/roomService';
import { createMessage } from './services/messageService';

const app = express();
app.use(express.json());

const httpServer = app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

// WebSocket connection handler
wss.on('connection', function connection(ws: WebSocket & { roomId?: number, userId?: number,senderName?:string }, req: http.IncomingMessage) {
  ws.on('error', console.error);

  ws.on('message', async (data: string) => {
    try {
      const message = JSON.parse(data);
      const { type, room, creatorId, userId, content, senderName } = message;
      // console.log(message);

      switch (type) {
        case 'CreateRoom':
          await handleCreateRoom(ws, room, creatorId);
          break;
        case 'JoinRoom':
          await handleJoinRoom(ws, room, userId,senderName);
          break;
        case 'sendMessage':
          await handleSendMessage(ws, content, userId, senderName);
          break;
        case 'LeaveRoom':
          await handleLeaveRoom(ws);
          break;
        default:
          ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
          break;
      }
    } catch (error) {
      console.error(error);
      ws.send(JSON.stringify({ type: 'error', message: 'Internal server error' }));
    }
  });

  ws.on('close', async () => {
    const roomId = ws.roomId;
    const userId = ws.userId;
    const senderName=ws.senderName;
    if (roomId && userId && senderName) {
      await handleLeaveRoom(ws);
    }
  });
});

// Function to handle room creation
async function handleCreateRoom(ws: WebSocket & { roomId?: number, userId?: number }, roomName: string, creatorId: number | undefined) {
  if (!validateRoomName(roomName)) {
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid room name' }));
    return;
  }

  if (!creatorId) {
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid creator ID' }));
    return;
  }

  const room = await createRoom(roomName, creatorId);
  ws.roomId = room.id;
  ws.userId = creatorId;
  ws.send(JSON.stringify({ type: 'system', message: `Room created: ${roomName}` }));
}

// Function to handle room joining
async function handleJoinRoom(ws: WebSocket & { roomId?: number, userId?: number,senderName?:string }, roomName: string, userId: number | undefined,senderName:string) {
  if (!validateRoomName(roomName)) {
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid room name' }));
    return;
  }

  const room = await findRoom(roomName);
  if (!room) {
    ws.send(JSON.stringify({ type: 'error', message: `Room does not exist: ${roomName}` }));
    return;
  }

  if (!userId) {
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid user ID' }));
    return;
  }

  await addUserToRoom(userId, room.id);
  ws.roomId = room.id;
  ws.userId = userId;
  ws.senderName=senderName;
  //ws.send(JSON.stringify({ type: 'system', message: `Joined room: ${roomName}` }));
  broadcastSystemMessage(room.id, `${senderName} has joined the room`);
}

// Function to handle sending messages
async function handleSendMessage(ws: WebSocket & { roomId?: number, userId?: number,senderName?:string }, content: string, userId: number | undefined, senderName: string) {
  const roomId = ws.roomId;
  if (!roomId || !validateMessage(content)) {
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message or room not joined' }));
    return;
  }

  if (!userId) {
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid user ID' }));
    return;
  }

  await createMessage(content, roomId, userId);
  broadcastMessage(roomId, content, userId, senderName);
}

// Function to handle leaving a room
async function handleLeaveRoom(ws: WebSocket & { roomId?: number, userId?: number,senderName?:string }) {
  const roomId = ws.roomId;
  const userId = ws.userId;
  const senderName=ws.senderName;

  if (roomId && userId) {
    ///await removeUserFromRoom(userId, roomId);
    //await deleteEmptyRooms();
    broadcastSystemMessage(roomId, `${senderName} has left the room`);
  }
}

// Function to broadcast messages to all clients in a room
function broadcastMessage(roomId: number, content: string, userId: number, senderName: string) {
  wss.clients.forEach((client) => {
    if ((client as any).roomId === roomId && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'message', content, userId, senderName }));
    }
  });
}

// Function to broadcast system messages to all clients in a room
function broadcastSystemMessage(roomId: number, content: string) {
  wss.clients.forEach((client) => {
    if ((client as any).roomId === roomId && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'system', content }));
    }
  });
}
