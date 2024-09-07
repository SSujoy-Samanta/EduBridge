import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRoom(name: string, creatorId: number) {
  try {
    console.log(name);
    console.log(creatorId)
    // Check if the room already exists
    let room = await prisma.room.findUnique({ where: { name } });
    
    if (!room) {
      // Create the room if it doesn't exist and associate it with the creator
      room = await prisma.room.create({ 
        data: { 
          name: name,
          createdBy: creatorId,
          users: {
            connect: { id: creatorId },  // Add the creator to the users list
          },
        },
      });
    }
    
    return room;
  } catch (error: any) {
    console.error(`Error creating room: ${error.message}`);
    throw new Error('Could not create room');
  }
}

export async function findRoom(name: string) {
  let room = await prisma.room.findUnique({ where: { name } });
  if (!room) {
    return null
  }
  return room;
}
export async function addUserToRoom(userId: number, roomId: number) {
  try {
    // Check if the user is already in the room
    const userInRoom = await prisma.room.findFirst({
      where: {
        id: roomId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (userInRoom) {
      console.log(`User ${userId} is already in room ${roomId}`);
      return userInRoom; // Return the room if the user is already in it
    }

    // Add the user to the room
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          connect: { id: userId },
        },
      }
    });

    console.log(`User ${userId} added to room ${roomId}`);
    return updatedRoom;
  } catch (error: any) {
    console.error(`Error adding user ${userId} to room ${roomId}: ${error.message}`);
  }
}
export async function removeUserFromRoom(userId: number, roomId: number) {
  try {
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        users: {
          disconnect: { id: userId },
        },
      },
    });
    
    console.log(`User with ID ${userId} removed from Room with ID ${roomId}`);
  } catch (error:any) {
    console.error(`Error removing user from room: ${error.message}`);

  }
}
export async function deleteEmptyRooms() {
  try {
    // Find all rooms with their associated users
    const rooms = await prisma.room.findMany({
      include: { users: true },
    });

    // Filter rooms that have no users
    const emptyRooms = rooms.filter((room : any) => room.users.length === 0);

    // Delete the empty rooms concurrently
    await Promise.all(
      emptyRooms.map((room : any)=>
        prisma.room.delete({
          where: { id: room.id },
        })
      )
    );

    console.log(`${emptyRooms.length} empty rooms deleted.`);
  } catch (error:any) {
    console.error(`Error deleting empty rooms: ${error.message}`);
  }
}