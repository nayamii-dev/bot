import {
    ChatInputCommandInteraction,
    SlashCommandNumberOption,
} from 'discord.js';

export class NumberArgument extends SlashCommandNumberOption {
    range: [min: number, max: number];
    value?: (num: number, interaction: ChatInputCommandInteraction) => number;

    constructor({
        value,
        range,
    }: {
        value: NumberArgument['value'];
        range: [min: number, max: number];
    }) {
        super();
        this.value = value;
        this.range = range;
    }
}
