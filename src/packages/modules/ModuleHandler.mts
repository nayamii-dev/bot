import { Collection } from 'discord.js';
import { EventEmitter } from 'node:events';
import { readdir } from 'node:fs/promises';
import { resolve } from 'path';

export interface ModuleManagerOptions {
    directory: string;
}
export class ModuleManager extends EventEmitter {
    options: ModuleManagerOptions;
    modules: Collection<string, any>;

    constructor(options: ModuleManagerOptions) {
        super({ captureRejections: true });
        this.options = options;
        this.modules = new Collection<string, any>();
    }
    async loadAll() {
        const files: string[] = [];
        await (async function read(dir) {
            const curdir = resolve(dir);
            const entries = await readdir(curdir, { withFileTypes: true });
            for (const entry of entries) {
                const newDir = resolve(curdir, entry.name);
                if (entry.isDirectory()) {
                    await read(newDir);
                } else if (entry.isFile()) {
                    files.push(newDir);
                }
            }
            return files;
        })(this.options.directory);
        for (const file of files) {
            const imported = await import(file);
            if (!imported?.default) continue;
            const mod = new imported.default();
            if (!mod.id) continue;
            if (this.modules.has(mod.id)) continue;
            mod.handler = this;
            mod.client;
        }
    }
}
