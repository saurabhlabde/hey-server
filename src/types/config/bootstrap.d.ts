import { Prisma, PrismaClient } from "prisma/prisma-client/index";
import express from "express";
import { PubSub } from "graphql-subscriptions";

export interface IContextRes {
        res: express.Response
}

export type IPrisma = PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

export interface IContext {
        res?: express.Response<any, Record<string, any>>
        prisma: IPrisma
        pubSub: PubSub
        Authorization?: string
}