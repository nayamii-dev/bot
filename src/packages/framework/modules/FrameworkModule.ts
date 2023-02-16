import { Nayami } from '../client';
import { FrameworkModuleHandler } from './ModuleHandler';

export interface FrameworkBaseModuleOptions {
    id: string;
}

export class FrameworkBaseModule {
    client!: Nayami;
    handler!: FrameworkModuleHandler<this>;
    options: FrameworkBaseModuleOptions;
    constructor(options: FrameworkBaseModuleOptions) {
        this.options = options;
    }
}
