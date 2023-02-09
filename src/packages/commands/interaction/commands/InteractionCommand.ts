import { CustomModule, CustomModuleOptions } from '@naya/core/modules';
import { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';
import { InteractionContext } from '../contexts/InteractionContext';

export interface InteractionCommandOptions extends CustomModuleOptions {
    builder: () => SlashCommandBuilder | ContextMenuCommandBuilder;
}

export abstract class BaseInteractionCommand extends CustomModule {
    declare options: InteractionCommandOptions;
    builder: SlashCommandBuilder | ContextMenuCommandBuilder;

    constructor(options: InteractionCommandOptions) {
        super(options);
        this.builder = options.builder();
    }

    abstract run(ctx: InteractionContext): Promise<any>;
}
