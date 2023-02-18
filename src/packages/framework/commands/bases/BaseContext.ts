import { Nayami } from '@naya/framework/client';
import { Interactionhandler } from '../interactions/CommandHandler';

interface Handlers {
    interactions: Interactionhandler;
}

export class BaseContext<Handler extends keyof Handlers> {
    client: Nayami;
    handler: Handlers[Handler];

    constructor(handler: Handlers[Handler]) {
        this.handler = handler;
        this.client = handler.client;
    }
}
