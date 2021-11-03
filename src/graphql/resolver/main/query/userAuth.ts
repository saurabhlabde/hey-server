import { Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { UserAuthReturn } from '../../../type/return/main';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class UserAuthResolver {

        @Query(() => UserAuthReturn)
        async userAuth(@Ctx() ctx: IContext) {

                const { user }: IValidAuth = await validAuth(ctx)

                const prisma = ctx.prisma

                try {
                        const res = await prisma.user.findFirst({
                                where: {
                                        id: user.userId
                                }, select: {
                                        id: true,
                                        firstname: true,
                                        lastname: true,
                                        profileImage: true,
                                }
                        })

                        return res

                } catch (error) {
                        const message = generateMessage({
                                messages: [],
                                message: "user not fount",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND_ERROR', { message })
                }

        }
}
