import { UserInputError } from "apollo-server-errors"
import { Ctx, Resolver, Root, Subscription } from "type-graphql"

// gql
import { Message } from "../../../../graphql/type/model"

// utils
import { generateMessage } from "../../../../utils/jwt/message"

// type
import { IError } from "@src/types/utils/validation"

@Resolver()
export class MessageSubscriptionResolver {
        @Subscription(() => Message, {
                topics: ["ADD_MESSAGE", "UPDATE_MESSAGE"],
        })

        async getMessageSubscription(@Ctx() ctx: any, @Root() payload: any) {

                const messages: Array<IError> = []

                const prisma = ctx.prisma

                try {

                        const resMessage = await prisma.message.findFirst({
                                where: {
                                        id: payload?.id
                                },
                        })

                        return resMessage

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