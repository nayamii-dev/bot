import { env } from '@naya/env';
import { createStringEnum, keys } from '@naya/util/functions';


export const loggerTypes = createStringEnum([
    'LOG', 'INFO', 'ERROR', 'FATAL',
    'SENTRY', 'DEBUG'
]);

const TOPICS = {
    INTERACTION_CREATE: 'interactionCreate',
    LOG_INFO: 'logInfo',
    CLIENT_INIT: 'clientInit'
} as const;

export type LoggerType = keyof typeof loggerTypes;

export class Logger {

    constructor(public readonly label: string) { }

    public debug({

        content,
        label = this.label,
        topic,
        shard = 0
    }: {
        content: string;
        label: string;
        topic: keyof typeof TOPICS;
        shard?: number;
    }) {

        if (env.get('BOT_ENV') !== 'dev') return;
        return this.$write({
            content, label, topic, type: loggerTypes.DEBUG,
            shard
        });

    }

    public log({
        content,
        label = this.label,
        topic,
        shard = 0
    }: {
        content: string;
        label: string;
        topic: keyof typeof TOPICS;
        shard?: number;
    }) {

        return this.$write({
            content, label, topic, type: 'LOG',
            shard
        });

    }



    private $write({
        content,
        label = this.label,
        topic = 'LOG_INFO',
        type,
        shard = 0
    }: {
        content: string;
        label?: string;
        topic?: keyof typeof TOPICS;
        type: LoggerType;
        shard?: number;
    }) {
        console.log([
            `Shard #${shard}`,
            `[${new Date().toLocaleTimeString(env.get('LOCALE'))}]`,
            `<${label}:${topic}:${type}> `,
            content
        ].join(' '));
    }




    get topics() {
        return createStringEnum(keys(TOPICS));
    }



}
