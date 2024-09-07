/*
  Warnings:

  - You are about to drop the column `profession` on the `User` table. All the data in the column will be lost.
  - Added the required column `affiliates` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currDegree` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pastDegree` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profession",
ADD COLUMN     "affiliates" TEXT NOT NULL,
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "currDegree" TEXT NOT NULL,
ADD COLUMN     "pastDegree" TEXT NOT NULL;
