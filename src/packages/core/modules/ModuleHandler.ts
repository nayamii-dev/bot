import { Collection } from 'discord.js';
import { Nayami } from '../Client';
import { CustomModule } from './CustomModule';
import { EventEmitter } from 'events';
import { readdirAll, xrequire } from '@naya/util/funcs';

export interface ModuleHandlerOptions {
    directory: string;
}

export class ModuleHandler<Mod extends CustomModule> extends EventEmitter {
    modules: Collection<string, Mod>;

    options: ModuleHandlerOptions;

    client: Nayami;

    constructor(client: Nayami, options: ModuleHandlerOptions) {
        super({ captureRejections: true });

        this.client = client;
        this.options = options;
        this.modules = new Collection<string, Mod>();
    }

    public loadAll() {
        const files = readdirAll(this.options.directory);

        for (const file of files) {
            const importedFile = xrequire<{
                disabled?: boolean;
                default: new (...args: any[]) => Mod;
            }>(file);

            if (importedFile.disabled) continue;
            if (!importedFile.default) {
                this.emit('fileInvalid', {
                    mod: importedFile,
                    file: importedFile,
                });
                continue;
            }
            const mod = new importedFile.default();
            if (this.modules.has(mod.options.id)) {
                this.emit('alreadyLoaded', { mod });
                continue;
            }
            mod.client = this.client;
            mod.handler = this;

            this.modules.set(mod.options.id, mod);
            this.emit('loaded', { mod });
        }
    }

    get(id: string) {
        return this.modules.get(id);
    }
}
