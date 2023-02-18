import {
    FrameworkBaseModule,
    FrameworkBaseModuleOptions,
} from '@naya/framework/modules/FrameworkModule';

export interface BaseCommandMetadata {}

export interface BaseCommandOptions extends FrameworkBaseModuleOptions {}

export class BaseCommand extends FrameworkBaseModule {
    declare options: BaseCommandOptions;

    constructor(options: BaseCommandOptions) {
        super(options);
    }
}
