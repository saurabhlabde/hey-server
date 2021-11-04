import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import * as bycrypt from "bcryptjs";
import { UserInputError } from 'apollo-server';

// input
import { LoginInput } from '../../type/input/auth/register'
import { generateMessage } from '../../../utils/jwt/message';

// utils
import { validateLoginInput } from '../../../utils/validation/login';
import { generateAccessToken } from '../../../utils/jwt/authTokenGenerate';

// gql
import { LoginReturn } from '../../type/return/auth';

// type
import { IContext } from '@src/types/config/bootstrap';

Resolver()
export class LoginResolver {

        @Mutation(() => LoginReturn)
        async login(@Arg('login') login: LoginInput, @Ctx() ctx: IContext) {
                const { messages, valid } = validateLoginInput(login)

                if (!valid) {
                        throw new UserInputError("INPUT_ERROR", { messages });
                }

                const { email, password } = login

                const prisma = ctx.prisma

                try {

                        const res: any = await prisma.user.findFirst({
                                where: {
                                        email,
                                }, select: {
                                        id: true,
                                        password: true
                                }
                        })

                        const matchPassword: boolean = await bycrypt.compare(password, res.password);

                        if (!matchPassword) {
                                const message = generateMessage({
                                        messages,
                                        message: "Login failed, invalid login details",
                                        type: "error",
                                });

                                throw new UserInputError("INVALID_LOGIN", { errors: message });
                        }

                        const tokenInfo = {
                                id: res?.id,
                        }

                        const token = generateAccessToken({ info: res.id });

                        return {
                                token
                        }

                } catch (error) {
                        const message = generateMessage({
                                messages,
                                message: "Invalid user",
                                type: "error",
                        });

                        throw new UserInputError("INVALID_LOGIN", { errors: message });
                }

        }
}
