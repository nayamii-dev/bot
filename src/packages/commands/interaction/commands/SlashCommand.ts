import { SlashCommandBuilder } from 'discord.js';
import {
    BaseInteractionCommand,
    InteractionCommandOptions,
} from './InteractionCommand';

///@ts-expect-error
export interface SlashCommandOptions extends InteractionCommandOptions {
    builder: (builder: SlashCommandBuilder) => typeof builder;
}

export abstract class SlashCommand extends BaseInteractionCommand {
    builder: SlashCommandBuilder;

    constructor(options: SlashCommandOptions) {
        super(options);
        this.builder = options.builder(new SlashCommandBuilder());
    }

    upload() {
        return this.builder.toJSON();
    }
}
