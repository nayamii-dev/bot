import { Nayami } from '@naya/client';
import { env } from '@naya/env';
// env.algkhalg

const client = new Nayami();

async function main() {

    client.listenerHandler.setEmitter('client', client);
    client.listenerHandler.loadAll();
    client.i18n.loadAll();
    await client.login(env.get('DISCORD_TOKEN'));
}


main().catch(er => {
    client.logger['$write']({
        content: `Error on startup: ${er}`,
        type: 'FATAL',
    });

});
