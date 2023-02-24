import { Nayami } from '@naya/client';
import { env } from '@naya/env';


const client = new Nayami();

async function main() {

    client.listenerHandler.setEmitter('client', client);
    client.listenerHandler.loadAll();
    await client.login(env.get('DISCORD_TOKEN'));
}


main().catch(er => {
    client.logger['$write']({
        content: `Error on startup: ${er}`,
        type: 'FATAL',
    });

});
