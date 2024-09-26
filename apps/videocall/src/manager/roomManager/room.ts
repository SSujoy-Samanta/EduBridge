import { UserManager } from "../userManager/user";
import { User } from "../userManager/user";

interface Room {
    name: string;
    users: User[];
}

export class RoomManager {
    private rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    // Create a new room with the given user and room name
    createRoom(user: User, roomName: string): void {
        const newRoom: Room = {
            name: roomName,
            users: [user], // Add the initial user to the room
        };
        this.rooms.push(newRoom);
    }

    // Retrieve a room by its name
    getRoomByName(roomName: string): Room | undefined {
        return this.rooms.find(room => room.name === roomName);
    }

    // Add a user to the specified room
    addUserToRoom(user: User, roomName: string): boolean {
        try {
            const room = this.getRoomByName(roomName);
            if (!room) {
                // Create a new room if it doesn't exist
                this.createRoom(user, roomName);
                return true;
            } else {
                // Add the user to the existing room
                room.users.push(user);
                const user1=room.users[0];
                if(user1){
                    user1.socket.send(JSON.stringify({ type: 'joined', roomName }));
                }
                user.socket.send(JSON.stringify({ type: 'joined', roomName }));
                return true;
            }
        } catch (error: any) {
            console.error("Failed to add user to room:", error);
            return false;
        }
    }

    // Remove a user from a room
    removeUserFromRoom(user: User, roomName: string): boolean {
        const room = this.getRoomByName(roomName);
        if (room) {
            const initialUserCount = room.users.length;
            room.users = room.users.filter(x => x.id !== user.id); // Remove the user by their ID
            room.users.forEach((user:User)=>{
                user.socket.send(JSON.stringify({ type: 'left'}))
            })
            return room.users.length < initialUserCount; // Return true if a user was removed
        }
        return false;
    }

    // Delete a room if it has no users
    deleteRoom(roomName: string): boolean {
        const roomIndex = this.rooms.findIndex(room => room.name === roomName);
        if (roomIndex !== -1 && this.rooms[roomIndex]?.users.length === 0) {
            this.rooms.splice(roomIndex, 1); // Remove the room from the array
            return true; // Room successfully deleted
        }
        return false; // Room not found or still has users
    }

    // Handle the offer creation event
    onCreateOffer(roomName: string, sdp: string, senderId: number): void {
        const room = this.getRoomByName(roomName);
        if (!room) return;

        const receivingUsers = room.users.filter(user => user.id !== senderId); // All users except the sender
        receivingUsers.forEach(user => {
            user.socket.send(JSON.stringify({ type: 'createOffer', sdp, roomName }));
        });
    }

    // Handle the answer event
    onAnswer(roomName: string, sdp: string, senderId: number): void {
        const room = this.getRoomByName(roomName);
        if (!room) return;

        const receivingUsers = room.users.filter(user => user.id !== senderId); // All users except the sender
        receivingUsers.forEach(user => {
            user.socket.send(JSON.stringify({ type: 'createAnswer', sdp, roomName }));
        });
    }

    // Handle ICE candidates being exchanged between users
    onIceCandidates(roomName: string, senderId: number, candidate: RTCIceCandidate, types: "sender" | "receiver"): void {
        const room = this.getRoomByName(roomName);
        if (!room) return;

        const receivingUsers = room.users.filter(user => user.id !== senderId); // All users except the sender
        receivingUsers.forEach(user => {
            user.socket.send(JSON.stringify({ type: 'add-ice-candidate', candidate, types }));
        });
    }
}
