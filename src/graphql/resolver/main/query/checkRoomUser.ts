import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { CheckRoomUserInput } from '../../../type/input/main/query';
import { UserAuthReturn } from '../../../type/return/main';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';
import { IError } from '@src/types/utils/validation';

Resolver()
export class CheckRoomUserResolver {

        @Query(() => Boolean)
        async checkRoomUser(@Arg('checkRoomUser') room: CheckRoomUserInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { userId } = room

                if (!userId) {
                        const message = generateMessage({
                                messages,
                                message: "invalid user id",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND_ERROR', { message })
                }

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
                                select: {
                                        userId: true
                                }
                        })

                        const isRoomUser = [...resChatRoomUser.map((user: any) => user.userId !== userId)]

                        let checker = (arr: any) => arr.every(Boolean);

                        return checker(isRoomUser)

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
