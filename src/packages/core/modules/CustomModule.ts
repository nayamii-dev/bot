import { Nayami } from '../Client';
import { ModuleHandler } from './ModuleHandler';

export interface CustomModuleOptions {
    id: string;
    guildId?: string;
}

/**
 * representates a base module that combines
 */
export class CustomModule {
    /**
     * the client referencing this module
     */
    client!: Nayami;
    /**
     * the handler that initialized this module
     */
    handler!: ModuleHandler<this>;

    options: CustomModuleOptions;

    constructor(options: CustomModuleOptions) {
        this.options = options;
    }

    onReady?(): any;

    static applyOptions<Opt extends CustomModuleOptions>(options: Opt) {
        return (cls: any): any => {
            abstract class NayaModule extends cls {
                constructor() {
                    super(options);
                }
            }

            return NayaModule;
        };
    }
}
