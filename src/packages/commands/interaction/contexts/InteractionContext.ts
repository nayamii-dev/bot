import { Interaction } from 'discord.js';
import { BaseInteractionCommand } from '../commands/InteractionCommand';
import { InteractionCommandHandler } from '../InteractionCommandHandler';

export class InteractionContext {
    constructor(
        readonly command: BaseInteractionCommand,
        readonly handler: InteractionCommandHandler,
        private readonly interaction: Interaction
    ) {}

    get author() {
        return this.interaction.user;
    }

    get member() {
        return this.interaction.member;
    }

    get client() {
        return this.command.client;
    }
}
