import { CLIENT_OPTIONS } from '@naya/util/constants';
import { keys } from '@naya/util/functions';
import { Client } from 'discord.js';
import { Database } from '../database';
import { FrameworkEventHandler } from '../events/FrameworkEventHandler';

interface _Handlers {
    loadAll(): void;
    listener: FrameworkEventHandler;
}



export class Nayami<Ready extends boolean = boolean> extends Client<Ready> {
    db: Database;
    handlers: _Handlers;

    constructor() {
        super(CLIENT_OPTIONS);
        this.db = new Database();

        this.handlers = {

            loadAll() {
                for (const key of keys(this)) {
                    if (key === 'loadAll') continue;
                    this[key].loadALL();
                }

            },
            listener: new FrameworkEventHandler(this, { directory: 'dist/bot/events' })
        };

    }


    async run(token: string) {

        await this.db.init();
        this.handlers.loadAll();

        await this.login(token);
    }

};
