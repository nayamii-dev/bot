import { Nayami } from '@naya/client';
import { applyOptions } from '@naya/decorators/commands';
import { Listener, ListenerOptions } from '@naya/listeners/Listener';
import { Events } from 'discord.js';



@applyOptions<ListenerOptions>({
    emitter: 'client',
    event: Events.ClientReady,
    id: 'events.client.ready',
    type: 'on'
})
export default class ReadyEvent extends Listener {


    run(client: Nayami<true>) {
        client.logger.log({
            content: `${client.user?.username} is now ready`,
            label: 'CLIENT_INIT',
            topic: 'CLIENT_INIT'
        });
    }
}
