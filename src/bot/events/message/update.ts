import { CustomEvent, CustomEventOptions } from '@naya/events/Event';
import { Events, Message } from 'discord.js';

@CustomEvent.applyOptions<CustomEventOptions>({
    id: 'events.client.message.update',
    event: Events.MessageUpdate,
    handler: 'client',
    type: 'once',
})
export default class MessageUpdateEvent extends CustomEvent {
    async run(old: Message<true>, newMsg: Message<true>) {
        if (newMsg.partial) await newMsg.fetch();

        if (this.client.env.get('NODE_ENV') === 'dev') {
            console.debug(`[DEBUG] message update in ${newMsg.channel.name}`);
        }

        if (old.content === newMsg.content) return;
    }
}
