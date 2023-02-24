import { env } from '@naya/env';
import { createStringEnum, keys } from '@naya/util/functions';


export const loggerTypes = createStringEnum([
    'LOG', 'INFO', 'ERROR', 'FATAL',
    'SENTRY'
]);

const TOPICS = {
    INTERACTION_CREATE: 'interactionCreate',
    LOG_INFO: 'logInfo',
    CLIENT_INIT: 'clientInit'
} as const;

export type LoggerType = keyof typeof loggerTypes;

export class Logger {

    constructor(public readonly label: string) { }



    public log({
        content,
        label = this.label,
        topic
    }: {
        content: string;
        label: string;
        topic: keyof typeof TOPICS;
    }) {

        return this.$write({
            content, label, topic, type: 'LOG'
        });

    }



    private $write({
        content,
        label = this.label,
        topic = 'LOG_INFO',
        type
    }: {
        content: string;
        label?: string;
        topic?: keyof typeof TOPICS;
        type: LoggerType;
    }) {



        console.log([
            `[${new Date().toLocaleTimeString(env.get('LOCALE'))}]`,
            `< ${label}:${topic}:${type}> `,
            content
        ].join(' '));
    }




    get topics() {
        return createStringEnum(keys(TOPICS));
    }



}
