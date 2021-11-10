import { Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';

// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IError } from '@src/types/utils/validation';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class UpdateUserLastOnlineResolver {

        @Mutation(() => Boolean)
        async updateUserLastOnline(@Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { user }: IValidAuth = await validAuth(ctx)

                const prisma = ctx.prisma

                try {

                        const resUser: any = await prisma.user.update({
                                where: {
                                        id: user.userId
                                }, data: {
                                        lastOnlineAt: `${+new Date()}`
                                }, select: {
                                        id: true,
                                }
                        })

                        await ctx.pubSub.publish("UPDATE_USER_LAST_ONLINE", {
                                id: resUser.id,
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
