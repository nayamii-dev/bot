import { modules } from '@naya/core';

export interface CustomEventOptions extends modules.CustomModuleOptions {
    handler: string;
    event: string;
    type: 'on' | 'once';
}

export abstract class CustomEvent extends modules.CustomModule {
    declare options: CustomEventOptions;

    abstract run(...args: unknown[]): any;

    onReady() {
        if (this.client.env.get('NODE_ENV') === 'dev') {
            console.log(`loaded the ${this.options.event} event.`);
        }
    }
}
