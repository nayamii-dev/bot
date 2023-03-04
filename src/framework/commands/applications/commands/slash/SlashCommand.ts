import { BaseApplicationCommand, BaseApplicationCommandOptions } from '@naya/commands/applications/commands/BaseCommand';
import { SlashCommandBuilder } from 'discord.js';



export interface SlashCommandOptions extends BaseApplicationCommandOptions<SlashCommandBuilder> { };

export class SlashCommand extends BaseApplicationCommand<SlashCommandBuilder> { }
