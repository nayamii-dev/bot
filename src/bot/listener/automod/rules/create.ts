import { applyOptions } from '@naya/decorators/commands';
import { Listener, ListenerOptions } from '@naya/listeners/Listener';
import { Events, AutoModerationRule } from 'discord.js';


@applyOptions<ListenerOptions>({
    emitter: 'client',
    event: Events.AutoModerationRuleCreate,
    id: 'events.automod.rules.create',
    type: 'on'
})

export default class AutoModerationRuleCreateEvent extends Listener {

    run(rule: AutoModerationRule) {
        rule;
    }
}
