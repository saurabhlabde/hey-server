import { UserInputError } from "apollo-server-errors"
import { Ctx, Resolver, Root, Subscription } from "type-graphql"

// gql
import { MessageSubscriptionReturn } from "../../../../graphql/type/return/main"

// utils
import { generateMessage } from "../../../../utils/jwt/message"

// type
import { IError } from "@src/types/utils/validation"

@Resolver()
export class MessageSubscriptionResolver {
        @Subscription(() => MessageSubscriptionReturn, {
                topics: ["ADD_MESSAGE", "UPDATE_MESSAGE"],
        })

        async getMessageSubscription(@Ctx() ctx: any, @Root() payload: any) {

                const messages: Array<IError> = []

                const prisma = ctx.prisma

                try {

                        const resMessage = await prisma.message.findFirst({
                                where: {
                                        id: payload.id
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

                        return {
                                message: resMessage,
                                type: payload.type
                        }

                } catch (error) {
                        const message = generateMessage({
                                messages,
                                message: "get response failed",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND_ERROR', { message })
                }

        }

}