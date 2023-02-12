import { functions } from '@naya/util';
import { Collection } from 'discord.js';
import { Nayami } from '@framework/client/NayaClient';
import { FrameworkEventEmitter } from '@framework/custom/EventEmitter';
import { FrameworkBaseModule, FrameworkBaseModule as Module } from './FrameworkModule';

export interface FrameworkModuleHandlerOptions {
    directory: string;
}
export const EventNames = functions.createEnum([
    'invalidModule',
    'invalidModuleId'
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
            const data = functions.xrequire<{ default?: typeof FrameworkBaseModule; }>(file);
            if (!data.default) {
                this.emit(EventNames.invalidModule, { path: file, data: data });
                continue;
            }
            const fakeId = 'your mom';
            const thing = new data.default({ id: fakeId });
            if (thing.options.id === fakeId) {
                this.emit(
                    EventNames.invalidModuleId,
                    {
                        id: thing.options.id,
                        path: file,
                        mod: thing
                    });
                continue;
            }
        }
    }


}
