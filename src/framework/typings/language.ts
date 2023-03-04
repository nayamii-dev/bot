import { LocaleString } from 'discord.js';
interface _data {
    guilds: number;
    users: number;
}
export interface LanguageData {
    SYSTEM: {
        CLIENT_READY: (username: string, data: _data) => string;
        CLIENT_PRESENCE: (data: _data) => string;
    };
    ERRORS: SystemErrorKeys;

}

export type LocaleStringCustom = LocaleString | 'bavarian' | 'pirate';
interface SystemErrorKeys {
    ERROR_FATAL: (ctx: any, error: Error, command: string) => string;

}
