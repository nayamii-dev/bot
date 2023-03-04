import { functions } from '@naya/util';
import * as fs from 'fs';

class EnvManager<CustomEnv extends Record<string, string>> {
    private readonly $env!: CustomEnv;
    options: { override: boolean; };

    constructor(options: { override: boolean; }) {
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
                throw new Error(
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


    format() {


        if (!('COLORTERM' in this.$env)) {

        }

        return this;
    }

    get<Key extends keyof CustomEnv>(
        key: Key,
        def?: CustomEnv[typeof key]
    ): CustomEnv[typeof key] | undefined {
        return this.$env[key] || def;
    }
}

export const env = new EnvManager<{
    DISCORD_TOKEN: string;
    CLIENT_ID: string;
    MONGO_URI: string;
    COLORTERM: string;
    SUPPORT_SERVER: string;
    LOCALE: string;
    MONGO_PASS: string;
    BOT_ENV: 'prod' | 'dev' | 'premium';
}>({ override: false })
    .setDefaults({
        CLIENT_ID: '947042553457410088',
        BOT_ENV: 'dev',
        MONGO_URI: 'mongodb://localhost:27017/nayami',
        LOCALE: 'en-gb',
        COLORTERM: process.env.TERM || process.env.COLORTERM
    })
    .envFile('./.config/.env')
    .required([
        'CLIENT_ID', 'DISCORD_TOKEN', 'BOT_ENV'
    ]);
