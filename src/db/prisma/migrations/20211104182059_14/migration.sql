-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_chatRoomId_fkey";

-- AddForeignKey
ALTER TABLE "chatRoom" ADD CONSTRAINT "chatRoom_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
