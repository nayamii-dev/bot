import { ComponentHandler } from '@naya/components/ComponentHandler';
import { BaseApplicationCommand } from './commands/BaseCommand';
import { Collection, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';

export class ApplicationCommandManager extends ComponentHandler<BaseApplicationCommand> {

    map<D>(fn: (f: BaseApplicationCommand) => D): Collection<string, D>;
    map<D>(fn: (f: BaseApplicationCommand) => D, assArray: true): D[];
    map<D>(fn: (f: BaseApplicationCommand) => D, assArray = false) {
        const res = new Collection<string, T>;
        const arr = [...this.components.entries()];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i][1] as T;
            const id = arr[i][0];
            res.set(id, fn(item));
        }
        return assArray ? [...res.values()] : res;

    }

    filter<T extends BaseApplicationCommand>(fn: (f: T, key: string, index: number) => boolean, asArray: true): T[];
    filter<T extends BaseApplicationCommand>(fn: (f: T, key: string, index: number) => boolean): Collection<string, T>;
    filter<T extends BaseApplicationCommand>(fn: (f: T, key: string, index: number) => boolean, asArray = false) {
        const res = new Collection<string, T>;
        const arr = [...this.components.entries()];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i][1] as T;
            const id = arr[i][0];
            if (fn(item, id, i)) {
                res.set(id, item);
            }
        }
        return asArray ? [...res.values()] : res;

    }

    async upload(force = false) {

        const commands = this
            .filter(cmd => !cmd.options.metadata?.guildId).map(cmd => {
                return cmd.data;
            });

        if (!commands.length) {
            if (force) {
                await this.client.api.put({ path: this.client.api.routes.applicationCommands, data: { body: [] } });
            }
            this.client.logger.debug({
                content: `no commands to upload${force ? '... purged all commands.' : '.'}`,
                topic: 'CLIENT_INIT',
                label: 'commands.upload',
                shard: 0
            });
            return;
        }
        try {
            await this.client.api.put<RESTPostAPIApplicationCommandsJSONBody[]>({
                path: this.client.api.routes.applicationCommands,
                data: {
                    body: commands
                }
            });
        } catch (err) {
            if (err instanceof Error) { }
        }

    }

}
