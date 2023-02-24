import { readdirSync } from 'fs';
import * as _path from 'path';
export function keys<O extends Record<string, any>>(obj: O): (keyof O)[] {
    return [...Object.keys(obj)];
}

type _ValueOf<T> = T[keyof T];
export function values<O extends Record<string, any>>(obj: O): (_ValueOf<O>)[] {
    return [...Object.values(obj)];
}

export const path = _path;


export function readdirRecursive(dir: string) {

    const res: string[] = [];
    const p = path.resolve(dir);

    for (const fileData of readdirSync(p, { withFileTypes: true })) {
        const newPath = path.resolve(p, fileData.name);
        if (fileData.isDirectory()) {
            res.push(...readdirRecursive(newPath));
        }
        if (fileData.isFile()) {
            res.push(newPath);
        }
    }

    return res;

}

export function xrequire<T extends Record<string, any>>(mod: string): T {
    return require(mod);
}

export function createEnum<K extends string>(type: 'number' | 'string' | 'numberString', keys: readonly K[]) {
    const res = {} as any;
    for (let i = 0; i < keys.length; i++) {
        const data = keys[i];

        res[data] = type === 'number' ? i : data;
        if (type === 'numberString') {
            res[`${i}`] = data;
        }
    }
    return res;

}

export function createStringEnum<K extends string>(keynames: readonly K[]): Record<K, K> {
    return createEnum('string', keynames);
}

export function createNumberEnum<K extends string>(v: readonly K[]): Record<K, number> {
    return createEnum('number', v);
}
