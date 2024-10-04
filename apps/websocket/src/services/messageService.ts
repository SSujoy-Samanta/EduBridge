import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function createMessage(
  content: string,
  roomId: number,
  userId: number,
) {
  return await client.message.create({
    data: {
      content,
      roomId,
      userId,
    },
  });
}

export async function getMessages(roomId: number) {
  return await client.message.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
  });
}
