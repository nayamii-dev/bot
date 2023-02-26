import { applyOptions } from '@naya/decorators/commands';
import { Listener, ListenerOptions } from '@naya/listeners/Listener';
import { Events, AutoModerationRule } from 'discord.js';


@applyOptions<ListenerOptions>({
    emitter: 'client',
    event: Events.AutoModerationRuleDelete,
    id: 'events.automod.rules.create',
    type: 'on'
})

export default class AutoModerationRuleDeleteEvent extends Listener {

    run(rule: AutoModerationRule) {
        rule;
    }
}
