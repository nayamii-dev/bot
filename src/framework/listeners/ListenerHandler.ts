import { ComponentHandler } from '@naya/components/ComponentHandler';
import { Listener } from './Listener';
import { EventEmitter } from 'events';

export class ListenerHandler extends ComponentHandler<Listener> {

    public emitters: Record<string, EventEmitter> = {};


    setEmitter(name: string, emitter: EventEmitter) {
        if (!(emitter instanceof EventEmitter)) {
            throw new Error(`emitter ${name} is not a valid emitter. ${emitter.constructor.name}`);
        }
        if (name in this.emitters) {
            throw new Error('emitter already registered');
        }
        this.emitters[name] = emitter;
    }


    public loadAll(): void {
        super.loadAll();

        for (const mod of this.components.values()) {
            if (!(mod.emitter in this.emitters)) {
                throw new Error(`[INVALID_EMITTER] emitter ${mod.emitter} is not registered! `);
            }

            this.emitters[mod.emitter][mod.type](mod.event, (...args) => {
                return this.components.get(mod.options.id)?.run(...args);
            });
        }


    }

    static get events() {
        return {
            ...ComponentHandler.events,
        };
    }
}

