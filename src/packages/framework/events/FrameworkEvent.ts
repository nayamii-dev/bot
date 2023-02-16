import { FrameworkBaseModule, FrameworkBaseModuleOptions } from '../modules/FrameworkModule';

export interface FrameworkEventOptions extends FrameworkBaseModuleOptions {
    event: string;
    handler: string;
    type: 'on' | 'once';
}

export abstract class FrameworkEvent extends FrameworkBaseModule {
    declare options: FrameworkEventOptions;


    abstract run(...eventArgs: unknown[]): Promise<void>;

}
