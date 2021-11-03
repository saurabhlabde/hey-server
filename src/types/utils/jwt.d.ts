import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../db/prisma";

export interface MyContext {
        req: Request;
        res: Response;
        payload?: { id: number };
}

export type ITokenInfo = {
        id: number
}

export interface IThrowMessage {
        messages: Array<any>;
        message: string;
        type: string;
}

export interface IValidAuth {
        user: JwtPayload | {
                userId: number
        } | any
}

export interface IGenerateAccessToken {
        info: IUser | ITokenInfo
        secret?: string
        expires?: string
}

export interface IGenerateRefreshToken {
        info: IUser
}

export interface ISendRefreshToken {
        res: Response
        token: string
}