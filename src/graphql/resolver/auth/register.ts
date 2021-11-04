import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';
import { hash } from "bcryptjs";

// input
import { RegisterInput } from '../../type/input/auth/register'

// util
import { generateMessage } from '../../../utils/jwt/message';
import { validateRegisterInput } from '../../../utils/validation/register';
import { generateAccessToken } from '../../../utils/jwt/authTokenGenerate';

// gql
import { RegisterReturn } from '../../../graphql/type/return/auth';

// type
import { IContext } from '@src/types/config/bootstrap';

Resolver()
export class RegisterResolver {

        @Mutation(type => RegisterReturn)
        async register(@Arg('register') register: RegisterInput, @Ctx() ctx: IContext) {
                const { messages, valid } = validateRegisterInput(register)

                if (!valid) {
                        throw new UserInputError("INPUT_ERROR", { messages });
                }

                const { firstname, lastname, email, password, profileImage } = register

                const prisma = ctx.prisma

                const emailExist = await prisma.user.findFirst({
                        where: {
                                email
                        }
                })

                if (emailExist) {
                        const message = generateMessage({
                                messages,
                                message: "Email id already exist take anther email id",
                                type: "error"
                        })

                        throw new UserInputError('EXIST_ERROR', { message })
                }

                const passwordHash: string = await hash(password, 12);

                try {
                        const res = await prisma.user.create({
                                data: {
                                        firstname,
                                        lastname,
                                        email,
                                        profileImage,
                                        password: passwordHash,
                                        createdAtIso: new Date().toISOString(),
                                }, select: {
                                        id: true
                                }
                        })

                        const tokenInfo = {
                                id: res.id,
                        }

                        const token = generateAccessToken({ info: tokenInfo });

                        return {
                                token
                        }

                } catch (error) {
                        const message = generateMessage({
                                messages,
                                message: "Account create failed",
                                type: "error"
                        })

                        throw new UserInputError('CREATION_ERROR', { message })
                }

        }
}
