import { ActivityType, ClientOptions, Emoji, Options } from 'discord.js';
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
    presence: {
        activities: [
            { name: "my owner's orders", type: ActivityType.Listening },
        ],
    },
    ws: {
        properties: {
            browser: 'Discord iOS',
            os: 'Ubuntu',
            device: '@nayamii-dev/framework',
        },
    },
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
        NODE_ENV: ['prod', 'premium'].includes(process.env.NODE_ENV!)
            ? (process.env.NODE_ENV as 'dev')
            : 'dev',
    })
    .envFile('.config/.env')
    .required(['DISCORD_TOKEN', 'CLIENT_ID', 'NODE_ENV']);

interface EmojiData {
    boost_level0: string;
    boost_level1: string;
    boost_level2: string;
    boost_level3: string;
    dark_success: string;
    disabled: string;
    discordjs: string;
    enabled: string;
    error: string;
    idle: string;
    info: string;
    left: string;
    loading: string;
    loading2: string;
    member_boost: string;
    member_mobile_dnd: string;
    member_mobile_idle: string;
    member_mobile_online: string;
    nodejs: string;
    offline: string;
    online: string;
    right: string;
    server_community: string;
    server_member: string;
    server_owner: string;
    server_partnered: string;
    server_verified: string;
    settings_paused: string;
    settings_spam: string;
    stageChannel: string;
    status_dnd: string;
    status_streaming: string;
    success: string;
    ts: string;
    warning: string;
}

export const emojis: {
    custom: EmojiData;
    default: EmojiData;
} = {
    custom: {
        boost_level0: '<:boost_level0:828615920049717328>',
        boost_level1: '<:boost_level1:828615802084261958>',
        boost_level2: '<:boost_level2:828615687702315098>',
        boost_level3: '<:boost_level3:828615545548308560>',
        dark_success: '<:dark_success:849858280225767504>',
        disabled: '<:disabled:828615476183302165>',
        discordjs: '<:discordjs:832845723967684631>',
        enabled: '<:enabled:828615984687349761>',
        error: '<:error:828614605352730685>',
        idle: '<:idle:828614978952232991>',
        info: '<:info:828615222586507325>',
        left: '<a:left:845931957966602260>',
        loading: '<a:loading:828615360139493426>',
        loading2: '<a:loading2:829431303799177239>',
        member_boost: '<:member_boost:828616412166619196>',
        member_mobile_dnd: '<:member_mobile_dnd:828616901809799180>',
        member_mobile_idle: '<:member_mobile_idle:828616743122763826>',
        member_mobile_online: '<:member_mobile_online:828616647710474261>',
        nodejs: '<:nodejs:832845692484845568>',
        offline: '<:offline:829068801869611008>',
        online: '<:online:828615170086404146>',
        right: '<a:right:845931734868688926>',
        server_community: '<:server_community:828616326393495582>',
        server_member: '<:server_member:831186631993065473>',
        server_owner: '<:server_owner:831186977855373362>',
        server_partnered: '<a:server_partnered:828616175297626113>',
        server_verified: '<:server_verified:828616125850845245>',
        settings_paused: '<:settings_paused:828617832065269781>',
        settings_spam: '<:settings_spam:828618183245430784>',
        stageChannel: '<:stageChannel:830296236685787156>',
        status_dnd: '<:status_dnd:828614695371800633>',
        status_streaming: '<:status_streaming:828614839182163999>',
        success: '<:success:828614918688604191>',
        ts: '<:ts:828615300819189800>',
        warning: '<:warning:845932798862819328>',
    },
    default: {
        boost_level0: '⭐',
        boost_level1: '✨',
        boost_level2: '💫',
        boost_level3: '🌟',
        dark_success: '✔️',
        disabled: '📴',
        discordjs: '🖥️',
        enabled: '📳',
        error: '❌',
        idle: '🟡',
        info: 'ℹ️',
        left: '<',
        right: '>',
        loading: '⌛',
        loading2: '⏳',
        member_boost: '✨',
        member_mobile_dnd: '📱❤️',
        member_mobile_idle: '📱',
        member_mobile_online: '📱💚',
        nodejs: '💻',
        offline: '⚪',
        online: '🟢',
        server_community: '🌐',
        server_member: '👤',
        server_owner: '👑',
        server_partnered: '',
        server_verified: '☑️',
        settings_paused: '⏸️',
        settings_spam: '',
        stageChannel: '',
        status_dnd: '🔴',
        status_streaming: '🟣',
        success: '✅',
        ts: '🚒',
        warning: '⚠️',
    },
};
