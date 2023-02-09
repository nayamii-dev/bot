import { ModuleHandler } from '@naya/core/modules';
import { CustomEvent } from './Event';
import { EventEmitter } from 'events';
import { PrismaClient } from '@prisma/client';

export class EventHandler extends ModuleHandler<CustomEvent> {
    $emitters: Record<string, EventEmitter> = {};

    setEmitters(emitters: Record<string, EventEmitter>) {
        for (const [id, emitter] of Object.entries(emitters)) {
            this.$emitters[id] = emitter;
        }
    }

    public loadAll(): void {
        super.loadAll();

        for (const mod of this.modules.values()) {
            const emitter = this.$emitters[mod.options.handler];
            if (mod.options.handler === 'prisma') {
                (emitter as unknown as PrismaClient)
                    .$on(
                        mod.options.event as 'beforeExit',
                        (...eventdata) => this.modules.get(mod.options.id)?.run(...eventdata)
                    );
            } else {
                emitter?.[mod.options.type](
                    mod.options.event,
                    (...args: unknown[]) =>
                        this.modules.get(mod.options.id)?.run(...args)
                );
            }
        }
    }
}
