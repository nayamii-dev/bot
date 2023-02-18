import { Nayami } from '@naya/framework/client';
import { env } from '@naya/util/constants';

const client = new Nayami();

async function main() {
    client.handlers.listener.addEmitter('client', client);
    await client.run(env.get('DISCORD_TOKEN')!);
}

main().catch((error) => {
    console.error(`failed to run naya. reason: ${error}`);
});
