import { Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { UserAuthReturn } from '../../../type/return/main';
import { ChatRoomUser } from '../../../type/model';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class GetChatRoomResolver {

        @Query(() => [ChatRoomUser])
        async getChatRoom(@Ctx() ctx: IContext) {

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
                                                        createdAt: "asc",
                                                }
                                        }
                                }
                        })

                        return resChatRoomUser

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
