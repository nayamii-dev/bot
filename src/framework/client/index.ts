import { ListenerHandler } from '@naya/listeners/ListenerHandler';
import { Logger } from '@naya/logger';
import { Client } from 'discord.js';

export class Nayami<Ready extends boolean = boolean> extends Client<Ready> {
    logger = new Logger('yae bot');
    listenerHandler: ListenerHandler;

    constructor() {
        super({ intents: [] });

        this.listenerHandler = new ListenerHandler(this, { path: './dist/bot/listener' });
    }
}
