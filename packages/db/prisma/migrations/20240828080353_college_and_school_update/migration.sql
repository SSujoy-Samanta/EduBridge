/*
  Warnings:

  - Added the required column `name` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situate` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situate` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "College" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "situate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "situate" TEXT NOT NULL;
