import { env } from '@naya/env';
import { type REST, RequestData, Routes } from 'discord.js';

interface ParamOptions {
    path: string;
    data?: RequestData;
}

interface PostOptions<Data> {
    path: string;
    data?: RequestData & { body: Data; };
}


export class DiscordApi {




    constructor(private readonly $rest: REST) { }


    async get<T extends Record<string, any>>({
        path,
        data
    }: ParamOptions): Promise<T> {
        return this.$rest.get(path as any, data) as Promise<T>;
    }

    async post<T extends Record<string, any>>({
        path, data
    }: PostOptions<T>) {
        return this.$rest.post(path as any, data);
    }

    async put<T extends Record<string, any>>({
        path, data
    }: PostOptions<T>) {
        return this.$rest.put(path as any, data);
    }



    get routes() {
        return {
            applicationCommands: Routes.applicationCommands(env.get('CLIENT_ID')!)
        };
    }


}
