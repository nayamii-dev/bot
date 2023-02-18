import { functions } from '@naya/util';
import { Collection } from 'discord.js';
import { Nayami } from '@naya/framework/client';
import { FrameworkEventEmitter } from '@naya/framework/custom/EventEmitter';
import {
    FrameworkBaseModule,
    FrameworkBaseModule as Module,
} from './FrameworkModule';
import { env } from '@naya/util/constants';

export interface FrameworkModuleHandlerOptions {
    directory: string;
}
export const EventNames = functions.createEnum([
    'invalidModule',
    'invalidModuleId',
    'alreadyLoaded',
    'load',
]);

export class FrameworkModuleHandler<
    FrameworkBaseModule extends Module
> extends FrameworkEventEmitter {
    modules: Collection<string, FrameworkBaseModule>;
    client: Nayami;
    options: FrameworkModuleHandlerOptions;

    constructor(client: Nayami, options: FrameworkModuleHandlerOptions) {
        super();
        this.modules = new Collection<string, FrameworkBaseModule>();
        this.client = client;
        this.options = options;
    }

    loadALL() {
        const files = functions.readdir(this.options.directory);
        for (const file of files) {
            const data = functions.xrequire<{
                default?: typeof FrameworkBaseModule;
            }>(file);
            if (!data.default) {
                this.emit(EventNames.invalidModule, { path: file, data: data });
                continue;
            }
            const fakeId = 'lkqeghalkghbaüähglkhtöälkqwhzöäjgsklhgö';
            const thing = new data.default({ id: fakeId });
            thing.handler = this;
            thing.client = this.client;
            if (thing.options.id === fakeId) {
                this.emit(EventNames.invalidModuleId, {
                    mod: thing,
                });
                continue;
            }
            if (this.modules.has(thing.options.id)) {
                this.emit(EventNames.alreadyLoaded, {
                    mod: thing,
                });
                continue;
            }
            this.modules.set(thing.options.id, thing as FrameworkBaseModule);
            this.emit(EventNames.load, { mod: thing });
        }
        if (env.get('NODE_ENV') == 'dev') {
            console.debug(`[DEBUG] loaded ${this.constructor.name} `);
        }
    }
}
