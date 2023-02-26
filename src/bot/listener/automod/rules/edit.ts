import { applyOptions } from '@naya/decorators/commands';
import { Listener, ListenerOptions } from '@naya/listeners/Listener';
import { Events, AutoModerationRule } from 'discord.js';

@applyOptions<ListenerOptions>({
    emitter: 'client',
    event: Events.AutoModerationRuleUpdate,
    id: 'events.automod.rules.create',
    type: 'on'
})

export default class AutoModerationRuleEditEvent extends Listener {

    run(oldRule: AutoModerationRule, rule: AutoModerationRule) {
        oldRule && rule;
    }
}
