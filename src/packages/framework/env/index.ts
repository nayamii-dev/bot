import { functions } from '@naya/util';
import * as fs from 'fs';
import { CustomError } from '@naya/framework/custom/Error';

export class EnvManager<CustomEnv extends Record<string, string>> {
    private readonly $env!: CustomEnv;
    options: { override: boolean };

    constructor(options: { override: boolean }) {
        Object.defineProperty(this, '$env', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: {},
        });

        this.options = options;
    }

    required(keys: (keyof CustomEnv)[]) {
        for (const key of keys) {
            if (!this.$env[key]) {
                throw new CustomError(
                    `Env key "${key.toString()}" is missing.`
                );
            }
        }

        return this;
    }

    setDefaults(things: Partial<CustomEnv>) {
        for (const key of functions.keys(things)) {
            if (this.$env[key]) continue;
            this.$env[key] = things[key]!;
        }

        return this;
    }

    envFile(path: string) {
        const fileData = fs.readFileSync(path, { encoding: 'utf-8' });
        for (const line of fileData.split('\n')) {
            if (!line.includes('=')) continue;
            const [name, ...values] = line.split('=');
            const key = name
                .replace(/\s+/g, '_')
                .replace(/-/g, '_') as keyof CustomEnv;
            if (this.$env[key] && this.options.override) {
                this.$env[key] = values.join('=') as CustomEnv[typeof key];
            }

            if (!this.$env[key]) {
                this.$env[key] = values.join('=') as CustomEnv[typeof key];
            }
        }
        return this;
    }

    json(things: Partial<CustomEnv>) {
        for (const key of functions.keys(things)) {
            if (this.$env[key] && this.options.override) {
                this.$env[key] = things[key]!;
            } else {
                continue;
            }
            if (!this.$env[key]) {
                this.$env[key] = things[key]!;
            }
        }

        return this;
    }

    env() {
        const things = process.env;
        for (const key of functions.keys(process.env)) {
            if (this.$env[key] && this.options.override) {
                this.$env[key as keyof CustomEnv] = things[key] as any;
                continue;
            }
            if (!this.$env[key]) {
                this.$env[key as keyof CustomEnv] = things[key] as any;
            }
        }
        return this;
    }

    get<Key extends keyof CustomEnv>(
        key: Key
    ): CustomEnv[typeof key] | undefined {
        return this.$env[key];
    }
}
