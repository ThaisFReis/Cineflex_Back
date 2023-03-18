/*
  Warnings:

  - You are about to drop the column `date` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `createAt` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "date",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL;
