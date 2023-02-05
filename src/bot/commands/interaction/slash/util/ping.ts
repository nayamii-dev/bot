import {
    SlashCommand,
    SlashCommandOptions,
} from '@naya/commands/interaction/commands/SlashCommand';
import { InteractionContext } from '@naya/commands/interaction/contexts/InteractionContext';

@SlashCommand.applyOptions<SlashCommandOptions>({
    id: 'commands.interactions.slash.util.ping',
    builder: (builder) =>
        builder
            .setName('ping')
            .setDescription('get the bot response time in milliseconds'),
})
export default class InteractionPingCommand extends SlashCommand {
    async run(ctx: InteractionContext) {
        ctx;
    }
}
