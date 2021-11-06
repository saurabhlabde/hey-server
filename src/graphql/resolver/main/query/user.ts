import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { UserInput } from '../../../type/input/main/query';
import { User } from '../../../type/model';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';
import { IError } from '@src/types/utils/validation';

Resolver()
export class GetUserResolver {

        @Query(() => User)
        async getUser(@Arg('user') user_i: UserInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { id } = user_i

                if (!id) {
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

                        const resUser = await prisma.user.findFirst({
                                where: {
                                        id
                                }
                        })

                        return resUser

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
