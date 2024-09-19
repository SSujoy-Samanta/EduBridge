-- CreateTable
CREATE TABLE "VideoCallRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "passkey" TEXT,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "VideoCallRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsersVideoCallRooms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoCallRoom_name_key" ON "VideoCallRoom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VideoCallRoom_passkey_key" ON "VideoCallRoom"("passkey");

-- CreateIndex
CREATE UNIQUE INDEX "_UsersVideoCallRooms_AB_unique" ON "_UsersVideoCallRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersVideoCallRooms_B_index" ON "_UsersVideoCallRooms"("B");

-- AddForeignKey
ALTER TABLE "VideoCallRoom" ADD CONSTRAINT "VideoCallRoom_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersVideoCallRooms" ADD CONSTRAINT "_UsersVideoCallRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersVideoCallRooms" ADD CONSTRAINT "_UsersVideoCallRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "VideoCallRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
