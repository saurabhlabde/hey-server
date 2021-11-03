import { AuthenticationError } from "apollo-server";
import * as jwt from "jsonwebtoken";

// type
import { IContext } from "@src/types/config/bootstrap";

export const validAuth = async (context: IContext) => {
        const authHeader = context?.res?.req?.headers?.authorization;

        if (authHeader) {
                const token = authHeader.split("Bearer ")[1];

                if (token) {
                        try {
                                const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY!);

                                return { user };
                        } catch (error) {
                                throw new AuthenticationError("Invalid token");
                        }
                }

                throw new Error(`Authentication token failed`);
        }
        throw new Error(`Authorization header must be provide`);
};