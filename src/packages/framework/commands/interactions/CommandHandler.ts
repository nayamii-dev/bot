import { Interaction } from 'discord.js';
import { BaseCommandHandler } from '../bases/BaseHandler';
import { BaseInteractionCommand } from './commands/base/BaseInteractionCommand';

export class Interactionhandler extends BaseCommandHandler<BaseInteractionCommand> {
    async handle(interaction: Interaction) {}

    get<Command extends BaseInteractionCommand>(
        commandid: string
    ): Command | null {
        if (!this.modules.has(commandid)) return null;
        return (this.modules.get(commandid) as Command) ?? null;
    }
}
