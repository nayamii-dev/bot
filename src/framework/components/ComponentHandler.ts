import { Component } from './Component';
import { EventEmitter as EventHandler } from 'events';
import { Collection } from 'discord.js';
import { Nayami } from '@naya/client';
import { readdirRecursive, xrequire } from '@naya/util/functions';

export interface ComponentHandlerOptions {
    path: string;
}

export class ComponentHandler<
    Com extends Component
> extends EventHandler {

    readonly components: Collection<string, Com>;
    client: Nayami;
    options: ComponentHandlerOptions;

    constructor(
        client: Nayami,
        options: ComponentHandlerOptions
    ) {
        super({ captureRejections: true });

        this.client = client;
        this.options = options;
        this.components = new Collection();
    }


    get<C extends Com>(t: string): C | undefined {
        return this.components.get(t) as C | undefined;
    }



    public loadAll() {

        for (const file of readdirRecursive(this.options.path)) {
            const imported = xrequire<{
                default?: new (...args: any[]) => Com;
            }>(file);
            if (!imported.default) {
                //TODO: fire event when no module is found
                continue;
            }
            const mod = new imported.default();

            if (!(mod instanceof Component)) {
                //TODO: fire event when invalid module is found
                continue;
            }

            if (this.components.has(mod.options.id)) {
                // TODO: fire event when already loaded
                continue;
            }
            mod.client = this.client;
            mod.handler = this;

            this.components.set(mod.options.id, mod);
            this.emit(ComponentHandler.events.LOAD, { mod });

        }
    }


    static get events() {
        return {
            'LOAD': 'load',
        };
    }




}
