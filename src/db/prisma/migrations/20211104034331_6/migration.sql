-- DropForeignKey
ALTER TABLE "chatRoomUser" DROP CONSTRAINT "chatRoomUser_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "chatRoomUser" DROP CONSTRAINT "chatRoomUser_userId_fkey";

-- AlterTable
ALTER TABLE "chatRoomUser" ALTER COLUMN "chatRoomId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "chatRoomUser" ADD CONSTRAINT "chatRoomUser_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "chatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatRoomUser" ADD CONSTRAINT "chatRoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
