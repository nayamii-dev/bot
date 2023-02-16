import { EventEmitterError } from './Error';

interface FrameworkEventData {
    type: 'on' | 'once';
    priority: number;
    handler: (...args: unknown[]) => unknown;
}

const MAX_EVENT_HANDLER = 10;




export class FrameworkEventEmitter {

    events: Record<string, FrameworkEventData[]>;


    constructor() {
        this.events = {} as Record<string, FrameworkEventData[]>;
    }


    emit(event: string, ...args: unknown[]) {
        if (!this.events[event] || !this.events[event].length) return;
        const lst = this.events[event].sort((a, b) => a.priority > b.priority ? 1 : 0);
        for (let i = 0; i < lst.length; i++) {
            const ev = lst[i];
            if (ev.type === 'once') {
                this.events[event].splice(i, 1);
            }
            const th = ev.handler(...args);
            if (th instanceof Promise) {
                th.catch((err) => {
                    if (process.env.LOG_HANDLER_EXCEPTIONS) {
                        console.error(err);

                    }
                });
            }
        }

        return this;


    }


    off(event: string) {
        delete this.events[event];
        return this;
    }


    on(event: string, handler: (...args: unknown[]) => unknown, priority = 0) {
        const existing = this.events[event];

        if (!existing) {
            this.events[event] = [];
        }
        if (existing.length >= MAX_EVENT_HANDLER) {
            throw new EventEmitterError(event, `reached max event emitter count of ${MAX_EVENT_HANDLER}`);
        }
        this.events[event].push({ handler, priority, type: 'on' });
        return this;
    }

    once(event: string, handler: (...args: unknown[]) => unknown, priority = 0) {
        const existing = this.events[event];

        if (!existing) {
            this.events[event] = [];
        }
        if (existing.length >= MAX_EVENT_HANDLER) {
            throw new EventEmitterError(event, `reached max event emitter count of ${MAX_EVENT_HANDLER}`);
        }
        this.events[event].push({ handler, priority, type: 'once' });
        return this;
    }

}
