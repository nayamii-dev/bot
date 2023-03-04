import { SlashCommand, SlashCommandOptions } from '@naya/commands/applications/commands/slash/SlashCommand';
import { applyOptions } from '@naya/decorators/commands';
import { SlashCommandBuilder } from 'discord.js';

@applyOptions<SlashCommandOptions>({
    builder: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('checks if the bot is up and running.')
    ,
    id: 'interactions.slash.info.ping',
    metadata: {
        examples: [],
        usage: ['/ping'],
        category: 'info'
    }
})
export default class UtilPingSlashCommand extends SlashCommand { }
