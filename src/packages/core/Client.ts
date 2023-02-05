import { EnvManager } from '@naya/env';
import { EventHandler } from '@naya/events/EventHandler';
import { clientOptions } from '@naya/util/constants';
import { PrismaClient } from '@prisma/client';
import { Client } from 'discord.js';

export class Nayami<Ready extends boolean = boolean> extends Client<Ready> {
    prisma: PrismaClient;
    eventHandler: EventHandler;

    constructor(
        prisma: PrismaClient,
        readonly env: EnvManager<{
            DISCORD_TOKEN: string;
            NODE_ENV: 'prod' | 'dev' | 'prem';
            CLIENT_ID: string;
        }>
    ) {
        super(clientOptions);
        this.prisma = prisma;
        this.eventHandler = new EventHandler(this, {
            directory: './dist/bot/events',
        });
    }
}
