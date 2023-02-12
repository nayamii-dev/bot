import * as fs from 'fs';
import * as path from 'path';
export function readdir(path: string) {
    const res: string[] = [];
    const dirents = fs.readdirSync(path, { withFileTypes: true });
    for (const dirent of dirents) {
        const resolvedPath = resolve(path, dirent.name);
        if (dirent.isDirectory()) {
            res.push(...readdir(resolvedPath));
        } else if (dirent.isFile()) {
            res.push(resolvedPath);
        }
    }
    return res;
}


export function resolve(...paths: string[]) {
    return path.resolve(...paths);
}

export function xrequire<T extends Record<string, any>>(mod: string): T {
    return require(mod);
}
export function parse(thing: string) {
    return path.parse(thing);
}

export function createEnum<V extends string>(
    values: readonly V[]
): Record<V, V> {
    const res = {} as Record<V, V>;
    for (const value of values) {
        res[value] = value;
    }
    return res;
}

export function keys<T extends Record<string, any>>(obj: T): (keyof T)[] {
    return Object.keys(obj);
}
