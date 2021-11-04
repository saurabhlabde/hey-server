import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';

// input
import { CrateMessageInput } from '../../../type/input/main/mutation'

// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IError } from '@src/types/utils/validation';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class CratedMessageResolver {

        @Mutation(() => Boolean)
        async createMessage(@Arg('createMessage') message: CrateMessageInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { content, image, chatRoomId } = message

                if (content?.trim() === '' && !image || content?.trim() === '') {
                        const message = generateMessage({
                                messages,
                                message: "invalid message",
                                type: "error"
                        })

                        throw new UserInputError('INPUT_ERROR', { message })
                }

                const { user }: IValidAuth = await validAuth(ctx)

                const prisma = ctx.prisma
                try {

                        const res = await prisma.message.create({
                                data: {
                                        userID: user.userId,
                                        userId: user.userId,
                                        chatRoomID: chatRoomId,
                                        content,
                                        image,
                                        status: 'DELIVERED',
                                        chatRoomId: chatRoomId,
                                        createdAtIso: new Date().toISOString(),
                                }
                        })

                        await prisma.chatRoom.update({
                                where: {
                                        id: chatRoomId
                                }, data: {
                                        messageId: res.id
                                }
                        })

                        // const res = await prisma.chatRoom.findFirst({
                        //         where: {
                        //                 id: chatRoomId
                        //         }, include: {
                        //                 lastMessage: true
                        //         }
                        // })

                        // console.log(res, '__res');

                        return true

                } catch (error) {

                        console.log(error, 'error');


                        const message = generateMessage({
                                messages,
                                message: "create room failed",
                                type: "error"
                        })

                        throw new UserInputError('CREATION_ERROR', { message })

                }

        }

}
