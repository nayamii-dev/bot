import { Component, ComponentOptions } from '@naya/components/Component';

export interface ListenerOptions extends ComponentOptions {
    event: string;
    emitter: string;
    type: 'on' | 'once';
}

export abstract class Listener extends Component {
    event: string;
    emitter: string;
    type: 'on' | 'once';

    constructor(options: ListenerOptions) {
        super(options);
        this.event = options.event;
        this.emitter = options.emitter;
        this.type = options.type;
    }



    abstract run(...args: unknown[]): any;


}
