import { sign } from "jsonwebtoken";

// type
import { IGenerateAccessToken, IGenerateRefreshToken } from '@src/types/utils/jwt'

export const generateAccessToken = ({ info, expires, secret }: IGenerateAccessToken) => {

        return sign({ userId: info }, secret ? secret : process.env.JWT_TOKEN_SECRET_KEY!, {
                expiresIn: expires ? expires : "7d"
        });
};

export const generateRefreshToken = ({ info }: IGenerateRefreshToken) => {

        return sign(
                { userId: info.id, },
                process.env.REFRESH_TOKEN_SECRET_KEY!,
                {
                        expiresIn: "7d"
                }
        );
};
