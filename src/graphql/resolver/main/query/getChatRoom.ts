import { Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { UserAuthReturn } from '../../../type/return/main';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class GetChatRoomResolver {

        @Query(() => Boolean)
        async getChatRoomResolver(@Ctx() ctx: IContext) {

                const { user }: IValidAuth = await validAuth(ctx)

                const prisma = ctx.prisma

                try {

                        const resChatUser: any = await prisma.chatRoomUser.findMany({
                                where: {
                                        userId: user.userId
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
                                                        userId: { notIn: user.userId }
                                                }
                                        ]
                                },
                                include: {
                                        user: true,
                                        chatRoom: {
                                                include: {
                                                        lastMessage: true
                                                }
                                        }
                                }, orderBy: {
                                        chatRoom: {
                                                lastMessage: {
                                                        createdAt: "desc"
                                                }
                                        }
                                }
                        })

                        console.log(resChatRoomUser, 'resChatRoomUser');

                        // const resChatRoom = await prisma.chatRoom.findMany({
                        //         where: {
                        //                 id: { in: [...resChatRoomUser.map((room: any) => room.chatRoomId)] }
                        //         },

                        //         include: {
                        //                 lastMessage: true
                        //         }
                        // })

                        return true

                } catch (error) {
                        const message = generateMessage({
                                messages: [],
                                message: "get response failed",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND_ERROR', { message })
                }

        }
}
