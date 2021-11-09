import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';

// input
import { UpdateMessageStatusInput } from '../../../type/input/main/mutation'

// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IError } from '@src/types/utils/validation';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class UpdateMessageStatusResolver {

        @Mutation(() => Boolean)
        async updateMessageStatus(@Arg('updateMessage') messageInput: UpdateMessageStatusInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { type, messageId } = messageInput

                if (!messageId) {
                        const message = generateMessage({
                                messages,
                                message: "invalid message id",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND_ERROR', { message })
                }

                const { user }: IValidAuth = await validAuth(ctx)

                const prisma = ctx.prisma

                const resMessage: any = await prisma.message.findFirst({
                        where: {
                                id: messageId
                        }
                })

                if (!resMessage) {
                        const message = generateMessage({
                                messages,
                                message: "invalid message",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND_ERROR', { message })
                }

                try {

                        const resUpdateMessage: any = await prisma.message.update({
                                where: {
                                        id: messageId
                                }, data: {
                                        status: type
                                }
                        })

                        await ctx.pubSub.publish("UPDATE_MESSAGE", {
                                id: resUpdateMessage.id
                        })

                        return true

                }

                catch (error) {
                        const message = generateMessage({
                                messages,
                                message: "update message failed",
                                type: "error"
                        })

                        throw new UserInputError('UPDATE_ERROR', { message })

                }

        }

}
