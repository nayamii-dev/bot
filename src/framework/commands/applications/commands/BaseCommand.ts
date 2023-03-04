import { Component, ComponentOptions } from '@naya/components/Component';
import { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';

interface CommandMetaData {
    commandId?: string;
    guildId?: string;
    usage: string[];
    examples: string[];
    category: string;
}


export interface BaseApplicationCommandOptions<
    Builder extends SlashCommandBuilder | ContextMenuCommandBuilder = SlashCommandBuilder | ContextMenuCommandBuilder
> extends ComponentOptions {
    builder: Builder;
    metadata: CommandMetaData;
}
export class BaseApplicationCommand<
    Builder extends SlashCommandBuilder | ContextMenuCommandBuilder = SlashCommandBuilder | ContextMenuCommandBuilder
> extends Component {
    builder: Builder;
    declare options: BaseApplicationCommandOptions;

    constructor(opts: BaseApplicationCommandOptions<Builder>) {
        super(opts);
        this.builder = opts.builder;
    }

    get data() {
        return this.builder.toJSON();
    }

}
