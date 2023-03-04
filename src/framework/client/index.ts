import { DiscordApi } from '@naya/api/discord';
import { I18nManager } from '@naya/i18n/i18nManager';
import { ListenerHandler } from '@naya/listeners/ListenerHandler';
import { Logger } from '@naya/logger';
import { Client } from 'discord.js';

export class Nayami<Ready extends boolean = boolean> extends Client<Ready> {

    logger = new Logger('{{BOT_NAME}} bot');
    listenerHandler: ListenerHandler;
    i18n: I18nManager;
    api: DiscordApi;



    constructor() {
        super({ intents: [] });

        this.listenerHandler = new ListenerHandler(this, { path: './dist/bot/listener' });
        this.i18n = new I18nManager(this, { path: './dist/bot/languages' });
        this.api = new DiscordApi(this.rest);
    }
}
