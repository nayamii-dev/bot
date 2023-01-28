import { Client } from 'discord.js';
import { readFile } from 'node:fs/promises';
const client = new Client({ intents: [] });

const env = await (async () => {
    const content = await readFile('.config/.env', { encoding: 'utf-8' });
    const dat = {};

    for (const abc of content.split('\n')) {
        if (!abc.includes('=')) continue;
        const [key, ...values] = abc.split('=');
        if (!key || !values.length) continue;
        dat[key] = values.join('=');
    }
    return dat;
})();

await client.on('ready', async (c) => {
    await c.user.edit({
        avatar: await readFile(process.argv.slice(3)[0]),
        username: process.argv.slice(2)[0]
    });
    client.destroy();
    process.exit(0);
}).login(env.DISCORD_TOKEN)
