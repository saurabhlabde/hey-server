-- DropForeignKey
ALTER TABLE "chatRoom" DROP CONSTRAINT "chatRoom_messageId_fkey";

-- DropForeignKey
ALTER TABLE "chatRoom" DROP CONSTRAINT "chatRoom_userId_fkey";

-- AlterTable
ALTER TABLE "chatRoom" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "messageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "chatRoom" ADD CONSTRAINT "chatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatRoom" ADD CONSTRAINT "chatRoom_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
