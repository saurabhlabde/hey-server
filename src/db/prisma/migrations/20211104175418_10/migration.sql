/*
  Warnings:

  - You are about to drop the column `lastMessage` on the `chatRoom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chatRoomId]` on the table `message` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "chatRoom" DROP COLUMN "lastMessage";

-- CreateTable
CREATE TABLE "_messages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_messages_AB_unique" ON "_messages"("A", "B");

-- CreateIndex
CREATE INDEX "_messages_B_index" ON "_messages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "message_chatRoomId_key" ON "message"("chatRoomId");

-- AddForeignKey
ALTER TABLE "_messages" ADD FOREIGN KEY ("A") REFERENCES "chatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messages" ADD FOREIGN KEY ("B") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
