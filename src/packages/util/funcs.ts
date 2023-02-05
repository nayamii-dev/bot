import * as fs from 'fs';
import * as path from 'path';

export function readdirAll(dir: string) {
    const res: string[] = [];

    const fileDatas = fs.readdirSync(dir, { withFileTypes: true });

    for (const data of fileDatas) {
        const newpath = path.resolve(dir, data.name);
        if (data.isDirectory()) {
            res.push(...readdirAll(newpath));
        } else if (data.isFile()) {
            res.push(newpath);
        }
    }
    return res;
}

export function xrequire<T extends Record<string, any>>(thing: string): T {
    return require(thing);
}
