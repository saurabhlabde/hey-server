/*
  Warnings:

  - Added the required column `chatRoomID` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "chatRoomID" INTEGER NOT NULL;
