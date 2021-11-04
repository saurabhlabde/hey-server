-- DropForeignKey
ALTER TABLE "chatRoom" DROP CONSTRAINT "chatRoom_messageId_fkey";

-- AlterTable
ALTER TABLE "chatRoom" ADD COLUMN     "lastMessage" INTEGER;
