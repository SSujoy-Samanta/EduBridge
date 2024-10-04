/*
  Warnings:

  - You are about to drop the column `situate` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `situate` on the `School` table. All the data in the column will be lost.
  - Added the required column `degree` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "College" DROP COLUMN "situate",
ADD COLUMN     "degree" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "situate",
ADD COLUMN     "degree" TEXT NOT NULL;
