import { applyOptions } from '@naya/decorators/commands';
import { Listener, ListenerOptions } from '@naya/listeners/Listener';
import { Events } from 'discord.js';

@applyOptions<ListenerOptions>({
    emitter: 'client',
    event: Events.Error,
    id: 'events.client.error',
    type: 'on',
})
export default class Event extends Listener {
    run(err: Error) {
        err;
    }
}
