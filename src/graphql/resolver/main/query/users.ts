import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { UsersInput } from '../../../type/input/main/query';
import { User } from '../../../type/model';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class GetUsersResolver {

        @Query(() => [User])
        async getUsers(@Arg('users') users: UsersInput, @Ctx() ctx: IContext) {

                const { user }: IValidAuth = await validAuth(ctx)

                const { type } = users

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
                                }, select: {
                                        userId: true
                                }
                        })

                        const resUsers = await prisma.user.findMany({
                                where: {
                                        AND: [
                                                {
                                                        id: { notIn: [...resChatRoomUser.map((user: any) => user.userId)] }
                                                },
                                                {
                                                        id: { notIn: user.userId }
                                                }
                                        ]
                                }
                        })

                        return resUsers

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
