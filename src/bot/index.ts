import { Nayami } from '@naya/core/Client';
import { env } from '@naya/util/constants';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'mongodb://localhost:27017/naya'
        }
    }
});


const naya = new Nayami(prisma, env);
async function main() {
    naya.eventHandler.setEmitters({ client: naya });
    naya.eventHandler.loadAll();
    await naya.login(naya.env.get('DISCORD_TOKEN'));
}

main();
