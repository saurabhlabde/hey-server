import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';

// gql
import { SearchInput } from '../../../type/input/main/query';
import { User } from '../../../type/model';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';

Resolver()
export class SearchResolver {

        @Query(() => [User])
        async search(@Arg('search') search: SearchInput, @Ctx() ctx: IContext) {

                const { query } = search

                const { user }: IValidAuth = await validAuth(ctx)

                const prisma = ctx.prisma

                try {

                        const resSearch = await prisma.user.findMany({
                                where: {
                                        OR: [
                                                {
                                                        firstname: {
                                                                contains: query,
                                                                mode: 'insensitive',
                                                        }
                                                }, {
                                                        lastname: {
                                                                contains: query,
                                                                mode: 'insensitive',
                                                        }
                                                }
                                        ]
                                }
                        })

                        console.log(resSearch, 'resSearch');

                        return resSearch

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
