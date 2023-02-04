import { EnvManager } from '@naya/env';
import { ActivityType, ClientOptions, DefaultRestOptions, Options, Partials } from 'discord.js';


export const clientOptions: ClientOptions = {
    intents: [
        'AutoModerationConfiguration',
        'AutoModerationExecution',
        'DirectMessages',
        'GuildEmojisAndStickers',
        'GuildMembers',
        'GuildMessages',
        'GuildModeration',
        'Guilds',
        'MessageContent'
    ],
    closeTimeout: 5_000,
    waitGuildTimeout: 5_000,
    shards: 'auto',
    shardCount: 1,
    makeCache: Options.cacheWithLimits(Options.DefaultMakeCacheSettings),
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.ThreadMember,
        Partials.User,
    ],
    presence: {
        activities: [{
            name: 'netchicks',
            type: ActivityType.Watching
        }]
    },
    sweepers: Options.DefaultSweeperSettings,
    ws: {
        properties: {
            browser: 'Discord iOS',
            device: 'discord.js'
        }
    },
    rest: DefaultRestOptions,
    allowedMentions: {},
    failIfNotExists: true,


};


export const env = new EnvManager<{
    DISCORD_TOKEN: string;
    NODE_ENV: 'prod' | 'dev' | 'prem',
    CLIENT_ID: string;
}>()
    .setDefaults({
        CLIENT_ID: '947042553457410088',
        NODE_ENV: 'dev'
    })
    .file('./.config/.env');
