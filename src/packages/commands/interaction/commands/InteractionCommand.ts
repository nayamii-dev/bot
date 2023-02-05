import { CustomModule, CustomModuleOptions } from '@naya/core/modules';
import { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';
import { InteractionContext } from '../contexts/InteractionContext';

export interface InteractionCommandOptions extends CustomModuleOptions {
    builder: (
        builder: SlashCommandBuilder | ContextMenuCommandBuilder
    ) => typeof builder;
}

export abstract class BaseInteractionCommand extends CustomModule {
    abstract run(ctx: InteractionContext): Promise<any>;
}
