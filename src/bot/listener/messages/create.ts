import { applyOptions } from '@naya/decorators/commands';
import { Listener, ListenerOptions } from '@naya/listeners/Listener';
import { Events, Message } from 'discord.js';

@applyOptions<ListenerOptions>({
    emitter: 'client',
    event: Events.MessageCreate,
    id: 'events.client.messages.create',
    type: 'on',
})
export default class Event extends Listener {
    run(msg: Message<true>) {
        msg;
    }
}
