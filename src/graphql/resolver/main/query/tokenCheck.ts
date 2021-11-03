import { Ctx, Query, Resolver } from 'type-graphql'
import * as jwt from "jsonwebtoken";

// type
import { IContext } from '@src/types/config/bootstrap';

Resolver()
export class TokenCheckResolver {

        @Query(() => Boolean)
        async tokenCheck(@Ctx() ctx: IContext) {

                const authHeader = ctx?.res?.req?.headers?.authorization;

                if (authHeader) {
                        const token = authHeader.split("Bearer ")[1];

                        if (token) {
                                const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY!);

                                return user ? true : false
                        }
                }

                return false
        }
}
