/*
  Warnings:

  - Made the column `profession` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profession" SET NOT NULL;
