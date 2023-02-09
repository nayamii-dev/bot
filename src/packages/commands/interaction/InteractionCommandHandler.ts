import { ModuleHandler } from '@naya/core/modules';
import { env } from '@naya/util/constants';
import { CommandInteraction, Routes } from 'discord.js';
import { BaseInteractionCommand } from './commands/InteractionCommand';

export class InteractionCommandHandler extends ModuleHandler<BaseInteractionCommand> {
    async upload() {
        const commands = this.modules.filter(
            (command) => !command.options.guildId
        );

        await this.client.rest.put(
            Routes.applicationCommands(env.get('CLIENT_ID')),
            {
                body: commands.map((c) => c.builder),
            }
        );
    }

    get(id: string) {
        return (
            this.modules.find((command) => command.builder.name === id) ||
            super.get(id)
        );
    }

    async handle(interaction: CommandInteraction) {
        if (interaction.isChatInputCommand()) {
            const command = this.get(interaction.commandName);

            if (!command) {
                this.emit('commandUnknown', interaction);
                return;
            }

            this.emit('commandStarted', { interaction, command });
        }
    }
}
