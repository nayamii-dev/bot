import { ActivityType, ClientOptions, Options } from 'discord.js';
import { EnvManager } from '@naya/framework/env';
const opts: ClientOptions = {
    ...Options.createDefault(),
    intents: [
        'AutoModerationConfiguration',
        'AutoModerationExecution',
        'DirectMessages',
        'GuildEmojisAndStickers',
        'GuildIntegrations',
        'GuildInvites',
        'GuildMembers',
        'GuildMessages',
        'GuildModeration',
        'GuildPresences',
        'Guilds',
        'GuildWebhooks',
        'MessageContent',
    ],
    presence: { activities: [{ name: 'my owner\'s orders', type: ActivityType.Listening }] },
    ws: { properties: { browser: 'Discord iOS', os: 'Ubuntu', device: '@nayamii-dev/framework' } }

};
export const CLIENT_OPTIONS = opts;

export const env = new EnvManager<{
    DISCORD_TOKEN: string;
    CLIENT_ID: string;
    DATABASE_URL: string;
    NODE_ENV: 'dev' | 'prod' | 'premium';
}>({ override: false })
    .setDefaults({
        CLIENT_ID: '947042553457410088',
        NODE_ENV: ['prod', 'premium'].includes(process.env.NODE_ENV!) ? process.env.NODE_ENV as 'dev'
            : 'dev'
    })
    .envFile('.config/.env')
    .required(['DISCORD_TOKEN', 'CLIENT_ID', 'NODE_ENV'])
    ;
