import { UserInputError } from "apollo-server-errors"
import { Ctx, Resolver, Root, Subscription } from "type-graphql"

// gql
import { UserLastOnlineSubscriptionReturn } from "../../../type/return/main"

// utils
import { generateMessage } from "../../../../utils/jwt/message"

// type
import { IError } from "@src/types/utils/validation"

@Resolver()
export class UserLastOnlineSubscriptionResolver {
        @Subscription(() => UserLastOnlineSubscriptionReturn, {
                topics: ["UPDATE_USER_LAST_ONLINE"],
        })

        async getUserLastOnlineSubscription(@Ctx() ctx: any, @Root() payload: any) {

                const messages: Array<IError> = []

                const prisma = ctx.prisma

                try {

                        const resUser = await prisma.user.findFirst({
                                where: {
                                        id: payload.id
                                }, select: {
                                        id: true,
                                        lastOnlineAt: true
                                }
                        })


                        console.log(typeof Number(BigInt(resUser.lastOnlineAt)).toExponential(), 'big big')

                        return {
                                user: resUser,
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