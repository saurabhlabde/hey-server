import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';

// input
import { CrateRoomInput } from '../../../type/input/main/mutation'

// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';
import { CheckUserInRoom } from '../../../../utils/model/checkUserInRoom';

// gql
import { CreateChatRoomReturn } from '../../../../graphql/type/return/main';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IError } from '@src/types/utils/validation';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class CreateChatRoomResolver {

        @Mutation(() => CreateChatRoomReturn)
        async createChatRoom(@Arg('createRoom') createRoom: CrateRoomInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { userId } = createRoom

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

                const resCreateRoomUser: any = await prisma.user.findFirst({
                        where: {
                                id: userId
                        }
                })

                if (!resCreateRoomUser) {
                        const message = generateMessage({
                                messages,
                                message: "invalid user",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND_ERROR', { message })
                }

                try {

                        const { data } = await CheckUserInRoom({ prisma, userId, activeUserId: user.userId })

                        console.log(data, 'data');

                        if (!data) {

                                const resChatRoom = await prisma.chatRoom.create({
                                        data: {
                                                createdAtIso: new Date().toISOString(),
                                        }
                                })

                                await prisma.chatRoomUser.create({
                                        data: {
                                                chatRoomId: resChatRoom.id,
                                                userId: user.userId,
                                                createdAtIso: new Date().toISOString(),
                                        }
                                })

                                const resCreatedRoom = await prisma.chatRoomUser.create({
                                        data: {
                                                chatRoomId: resChatRoom.id,
                                                userId: resCreateRoomUser.id,
                                                createdAtIso: new Date().toISOString(),
                                        }, select: {
                                                id: true,
                                                chatRoomId: true,
                                                userId: true,
                                        }
                                })

                                return resCreatedRoom

                        } else {

                                return {
                                        id: null,
                                        chatRoomId: null,
                                        userId: null,
                                }

                        }

                } catch (error) {
                        const message = generateMessage({
                                messages,
                                message: "create room failed",
                                type: "error"
                        })

                        throw new UserInputError('CREATION_ERROR', { message })

                }

        }

}
