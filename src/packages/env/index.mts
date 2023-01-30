import { readFileSync } from 'node:fs';
export class EnvManager<Env extends Record<string, string>> {
    data: Env;

    constructor() {
        this.data = {} as Env;
    }

    get(key: keyof Env) {
        return this.data[key];
    }

    setDefaults(x: Partial<Env>) {
        for (const key of Object.keys(x)) {
            //@ts-expect-error
            this.data[key] = x[key];
        }

        return this;
    }

    file(path: string) {
        // const content = readFileSync(path, { encoding: 'utf-8' });
        (() => {
            const content = readFileSync(path, {
                encoding: 'utf-8',
            });

            for (const abc of content.split('\n')) {
                if (!abc.includes('=')) continue;
                const [key, ...values] = abc.split('=');
                if (!key || !values.length) continue;
                //@ts-expect-error
                this.data[key] = values.join('=');
            }
        })();
        return this;
    }

    required(keys: (keyof Env)[]) {
        for (const key of keys) {
            if (!this.data[key])
                throw new Error(`env key ${key.toString()} not present`);
        }
    }

    env() {
        for (const key of Object.keys(process.env)) {
            //@ts-expect-error
            this.data[key] = process.env[key];
        }
        return this;
    }
}
