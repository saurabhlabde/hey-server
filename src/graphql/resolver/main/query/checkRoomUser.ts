import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';


// util
import { generateMessage } from '../../../../utils/jwt/message';
import { validAuth } from '../../../../utils/jwt/authCheck';
import { CheckUserInRoom } from '../../../../utils/model/checkUserInRoom';

// gql
import { CheckRoomUserInput } from '../../../type/input/main/query';
import { CheckRoomUserReturn } from '../../../type/return/main';

// type
import { IContext } from '@src/types/config/bootstrap';
import { IValidAuth } from '@src/types/utils/jwt';
import { IError } from '@src/types/utils/validation';

Resolver()
export class CheckRoomUserResolver {

        @Query(() => CheckRoomUserReturn)
        async checkRoomUser(@Arg('checkRoomUser') room: CheckRoomUserInput, @Ctx() ctx: IContext) {
                const messages: Array<IError> = []

                const { userId } = room

                if (!userId) {
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

                        const { data } = await CheckUserInRoom({ prisma, userId, activeUserId: user.userId })

                        return data

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
