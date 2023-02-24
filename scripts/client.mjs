import { Client } from 'discord.js';
import { readFile } from 'node:fs/promises';
const client = new Client({ intents: [] });

const args = (() => {
    const args = process.argv.slice(2);
    switch (args[0]) {
        case 'set-avatar':
            return {
                type: 'SET_AVATAR',
                thing: args[1]
            };

        case 'set-username':
            if (args[1]?.length <= 2 || args[1]?.length >= 32) {
                throw new Error(`invalid username ${args[1]} must be length of 2 and 32.`);
            }
            return {
                type: 'SET_USERNAME',
                thing: args[1]
            };

        default:
            throw new Error('invalid options');
    }
})();


const env = await (async () => {
    const content = await readFile('.config/.env', {
        encoding: 'utf-8',
    });
    const dat = {};

    for (const abc of content.split('\n')) {
        if (!abc.includes('=')) continue;
        const [key, ...values] = abc.split('=');
        if (!key || !values.length) continue;
        dat[key] = values.join('=');
    }
    return dat;
})();

await client
    .on('ready', async (c) => {

        const { thing, type } = args;
        console.log(`${type} :: ${thing}`);
        if (!type) {
            throw new Error('invalid type');
        }
        const data = {};
        if (type === 'SET_USERNAME') {
            data.username = thing;
        }
        if (type === 'SET_AVATAR') {
            data.avatar = thing;
        }
        if (!Object.keys(type).length) {
            throw new Error('invalid argument');
        }
        if (!thing) {
            throw new Error('invalid thing. please specify sone');
        }
        await c.user.edit({
            username: data.username,
            avatar: data.avatar
        });
        client.destroy();
        process.exit(0);
    })
    .login(env.DISCORD_TOKEN);
