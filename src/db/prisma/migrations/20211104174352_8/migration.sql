/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `chatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chatRoom_messageId_key" ON "chatRoom"("messageId");
