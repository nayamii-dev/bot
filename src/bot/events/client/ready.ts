import { Nayami } from '@naya/core/Client';
import { CustomEvent, CustomEventOptions } from '@naya/events/Event';
import { Events } from 'discord.js';

@CustomEvent.applyOptions<CustomEventOptions>({
    id: 'events.client.ready',
    event: Events.ClientReady,
    handler: 'client',
    type: 'once',
})
export default class ReadyEvent extends CustomEvent {
    run(client: Nayami<true>) {
        console.log(`[READY] ${client.user.username} is now ready`);
    }
}
