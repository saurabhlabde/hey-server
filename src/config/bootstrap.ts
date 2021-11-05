import "reflect-metadata";

import { createServer } from 'http';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer, PubSub } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PrismaClient } from '@prisma/client'
// gql
import { resolvers } from "../graphql/resolver";

// type
import { IContextRes } from "@src/types/config/bootstrap";

// utils
import { validAuthSubscription } from '../utils/jwt/authCheck'

export const prisma = new PrismaClient()

const pubSub = new PubSub();

// config
const PORT = process.env.PORT || 5000;

export const bootstrap = async () => {
        const app = express();

        app.use(
                cors({
                        origin: "http://localhost:3000",
                        credentials: true
                })
        );

        app.use(cookieParser());

        app.get("/", (_, res) => res.send("server home page"));

        const schema = await buildSchema({ resolvers, pubSub });

        const node_env = process.env.NODE_ENV

        const playground: boolean = node_env === 'development'

        const server = new ApolloServer({
                schema,
                playground: playground,
                context: ({ res }: IContextRes) => ({ res, prisma, pubSub }),
                tracing: true,
                subscriptions: {
                        onConnect(connectionParams, webSocket) {
                                validAuthSubscription({ context: connectionParams })
                                console.log("websocket connect");
                        },
                        onDisconnect() {
                                console.log("websocket disconnect");
                        },
                },
        });

        server.applyMiddleware({ app });

        const httpServer = createServer(app);

        server.installSubscriptionHandlers(httpServer);

        httpServer.listen(PORT, () => {
                return console.log(`server online PORT ${PORT}`);
        });
};