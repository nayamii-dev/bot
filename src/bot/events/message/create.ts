import { CustomEvent, CustomEventOptions } from '@naya/events/Event';
import { Events, Message } from 'discord.js';

@CustomEvent.applyOptions<CustomEventOptions>({
    id: 'events.client.message',
    event: Events.MessageCreate,
    handler: 'client',
    type: 'once'
})
export default class ReadyEvent extends CustomEvent {


    run(msg: Message<true>) {
        if (this.client.env.get('NODE_ENV') === 'dev') {
            console.debug(`[DEBUG] new message on ${msg.channel.id}`);
        }

    }

}
