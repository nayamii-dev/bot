import { modules } from '@naya/core';

export interface CustomEventOptions extends modules.CustomModuleOptions {
    handler: string;
    event: string;
    type: 'on' | 'once';
}

export abstract class CustomEvent extends modules.CustomModule {
    declare options: CustomEventOptions;

    abstract run(...args: unknown[]): any;
}
