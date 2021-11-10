import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { GetMessageInput } from '../../../type/input/main/query';
import { Message } from '../../../type/model';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';
import { IError } from '@src/types/utils/validation';

Resolver()
export class GetMessageResolver {

        @Query(() => Message)
        async getMessage(@Arg('message') messageInput: GetMessageInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { messageId } = messageInput

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

                try {

                        const resMessage: any = await prisma.message.findFirst({
                                where: {
                                        id: messageId
                                }, include: {
                                        User: {
                                                select: {
                                                        id: true,
                                                        firstname: true,
                                                        lastname: true,
                                                        profileImage: true,
                                                }
                                        }
                                },
                        })

                        return resMessage

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
