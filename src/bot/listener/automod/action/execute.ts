import { applyOptions } from '@naya/decorators/commands';
import { Listener, ListenerOptions } from '@naya/listeners/Listener';
import { AutoModerationActionExecution, Events } from 'discord.js';


@applyOptions<ListenerOptions>({
    emitter: 'client',
    event: Events.AutoModerationActionExecution,
    id: 'events.automod.actions.execute',
    type: 'on'
})

export default class AutoModerationActionExecutionEvent extends Listener {


    async run(payload: AutoModerationActionExecution) {
        payload;

    }
}
