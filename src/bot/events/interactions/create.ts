import { CustomEvent, CustomEventOptions } from '@naya/events/Event';
import { Events, Interaction } from 'discord.js';

@CustomEvent.applyOptions<CustomEventOptions>({
    id: 'events.client.interactioncreate',
    event: Events.InteractionCreate,
    handler: 'client',
    type: 'on',
})
export default class InteractionsCreateCommand extends CustomEvent {
    async run(interaction: Interaction) {
        if (this.client.env.get('NODE_ENV') === 'dev') {
            console.log(
                `[DEBUG] <INTERACTION_CREATE> new interaction ${interaction.id} `
            );
        }
    }
}
