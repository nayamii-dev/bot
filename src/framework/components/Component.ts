import { Nayami } from '@naya/client';
import { ComponentHandler } from './ComponentHandler';

export interface ComponentOptions {
    id: string;
}


export class Component {
    client!: Nayami;
    handler!: ComponentHandler<this>;

    declare options: ComponentOptions;

    constructor(options: ComponentOptions) {
        this.options = options;
    }

}

