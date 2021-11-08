import { IPrisma } from "@src/types/config/bootstrap";

interface ICheckUserInRoom {
        prisma: IPrisma
        userId: number
        activeUserId: number
}

interface ICheckUserInRoomReturn {
        data: {
                userId: number | null
                chatRoomId: number | null
                isValid: boolean | null
        }
}

export const CheckUserInRoom = async ({ prisma, userId, activeUserId }: ICheckUserInRoom): Promise<ICheckUserInRoomReturn> => {
        const resChatUser: any = await prisma.chatRoomUser.findMany({
                where: {
                        userId: activeUserId
                },
                select: {
                        chatRoom: {
                                select: {
                                        id: true
                                }
                        }
                }
        })

        const resChatRoomUser = await prisma.chatRoomUser.findMany({
                where: {
                        AND: [
                                {
                                        chatRoomId: { in: [...resChatUser.map((room: any) => room.chatRoom.id)] }
                                },
                                {
                                        userId: { notIn: activeUserId }
                                }
                        ]
                },
                select: {
                        userId: true,
                        chatRoomId: true,
                }
        })

        const isRoomUser = [...resChatRoomUser.map((user: any) => user.userId !== userId ? { ...user, isValid: true } : { ...user, isValid: false })].filter((user: any) => user.userId === userId)

        return {
                data: isRoomUser.length >= 1 && isRoomUser[0]
        }
}