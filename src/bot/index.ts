import { Nayami } from '@naya/core/Client';
import { env } from '@naya/util/constants';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'mongodb://localhost:27017/naya',
        },
    },
    errorFormat: 'pretty',
    log: [
        {
            level: 'query',
            emit: 'event',
        },
        {
            level: 'error',
            emit: 'event'
        },
        {
            level: 'info',
            emit: 'event'
        },
        {
            level: 'warn',
            emit: 'event'
        }
    ]
});

const naya = new Nayami(prisma, env);
async function main() {
    naya.eventHandler.setEmitters({ client: naya });
    //@ts-expect-error
    naya.eventHandler.$emitters['prisma'] = prisma;
    naya.eventHandler.loadAll();
    await prisma.stats.create({
        data: {
            data: {
                statId: 'aaaaaa',
                maxMemory: 0,
                memoryusage: 0,
            }
        }
    });
    await naya.login(naya.env.get('DISCORD_TOKEN'));
}

main();
