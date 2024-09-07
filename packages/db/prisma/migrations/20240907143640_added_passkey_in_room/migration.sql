/*
  Warnings:

  - A unique constraint covering the columns `[passkey]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "passkey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Room_passkey_key" ON "Room"("passkey");
