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
        const lang = this.client.i18n.defaultLanguage.get('SYSTEM')!;
        if (!lang) return;
        const data = {
            guilds: client.guilds.cache.size,
            users: client.users.cache.size
        };

        client.logger.log({
            content: `${lang.CLIENT_READY(client.user.username, data)}`,
            label: 'CLIENT_INIT',
            topic: 'CLIENT_INIT'
        });

        client.user.setPresence({
            activities: [{
                name: lang.CLIENT_PRESENCE(data)
            }]
        });
    }
}
