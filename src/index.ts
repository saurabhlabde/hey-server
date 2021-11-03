import "reflect-metadata";
import "dotenv/config";

// config
import { bootstrap, prisma } from './config/bootstrap'


bootstrap().catch((e: any) => {
        throw e
})
        .finally(async () => {
                await prisma.$disconnect().then(() => {
                        console.log('prisma disconnect');
                })
        })
