import { UserInputError } from "apollo-server-errors"
import { Arg, Ctx, Resolver, Subscription } from "type-graphql"

// gql
import { Message } from "../../../../graphql/type/model"
import { MessageSubscribeInput } from "../../../../graphql/type/input/subscription/subscription"

// utils
import { generateMessage } from "../../../../utils/jwt/message"
import { validAuth } from "../../../../utils/jwt/authCheck"

// type
import { IValidAuth } from "@src/types/utils/jwt"
import { IError } from "@src/types/utils/validation"

@Resolver()
export class MessageSubscriptionResolver {
        @Subscription(() => [Message], {
                topics: ["ADD_MESSAGES"],
        })

        async getMessageSubscription(@Arg('message') room: MessageSubscribeInput, @Ctx() ctx: any,) {

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

                const prisma = ctx.prisma

                try {

                        const resMessages: any = await prisma.message.findMany({
                                where: {
                                        chatRoomID: roomId
                                }, orderBy: {
                                        createdAt: "desc"
                                }
                        })

                        // console.log(resMessages, 'resMessages');

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