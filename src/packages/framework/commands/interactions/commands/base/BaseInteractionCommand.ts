import {
    BaseCommand,
    BaseCommandOptions,
} from '@naya/framework/commands/bases/BaseCommand';

export interface BaseInteractionCommandOptions extends BaseCommandOptions {
    type: 'slash' | 'button' | 'user' | 'select' | 'message';
    data: any;
}

export class BaseInteractionCommand extends BaseCommand {
    declare options: BaseInteractionCommandOptions;
    constructor(options: BaseInteractionCommandOptions) {
        super(options);
    }
}
