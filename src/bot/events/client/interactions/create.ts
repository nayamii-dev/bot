import { applyOptions } from '@naya/decorators';
import { Nayami } from '@naya/framework/client';
import {
    FrameworkEvent,
    FrameworkEventOptions,
} from '@naya/framework/events/FrameworkEvent';
import { Events } from 'discord.js';

@applyOptions<FrameworkEventOptions>({
    id: 'events.client.ready',
    event: Events.InteractionCreate,
    handler: 'client',
    type: 'on',
})
export default class ClientReadyEvent extends FrameworkEvent {
    async run(client: Nayami<true>) {
        console.log(`[[READY]] ${client.user.username} is now ready `);
    }
}
