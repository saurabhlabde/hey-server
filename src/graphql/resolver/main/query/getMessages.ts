import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { GetMessagesInput } from '../../../type/input/main/query';
import { Message } from '../../../type/model';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';
import { IError } from '@src/types/utils/validation';

Resolver()
export class GetMessagesResolver {

        @Query(() => [Message])
        async getMessages(@Arg('messages') room: GetMessagesInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { roomId } = room

                if (!roomId) {
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

                        const resMessages: any = await prisma.message.findMany({
                                where: {
                                        chatRoomID: roomId
                                }, include: {
                                        User: {
                                                select: {
                                                        id: true,
                                                        firstname: true,
                                                        lastname: true,
                                                        profileImage: true,
                                                }
                                        }
                                }, orderBy: {
                                        createdAt: "desc"
                                }
                        })

                        return resMessages

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
