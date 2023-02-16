import { FrameworkEventEmitter } from '../custom/EventEmitter';
import { FrameworkModuleHandler } from '../modules/ModuleHandler';
import { FrameworkEvent } from './FrameworkEvent';
import { EventEmitter } from 'events';
import { CustomError } from '../custom/Error';

type Emitter = FrameworkEventEmitter | EventEmitter;

export class FrameworkEventHandler extends FrameworkModuleHandler<FrameworkEvent> {


    emitters: Record<string, Emitter> = {};


    addEmitter(name: string, value: Emitter) {
        if (this.emitters[name]) throw new CustomError(`[[ALREADY_REGISTERED]] the event emitter ${name} is already registered`);
        if (!(
            value instanceof FrameworkEventEmitter ||
            value instanceof EventEmitter
        )) throw new CustomError(`[[INVALID_LISTENER_TYPE]] the handler ${name} has an invalid type `);
        this.emitters[name] = value;


        return this;
    }


    loadALL(): void {
        super.loadALL();

        for (const mod of this.modules.values()) {

            if (!(mod.options.handler in this.emitters)) {
                throw new CustomError(`[INVALID_HANDLER] on module ${mod.options.id} the handler "{mod.options.handler}" is invalid.`);
            }

            this.emitters[mod.options.handler][mod.options.type](
                mod.options.event,
                (...args) =>
                    this.modules.get(mod.options.id)?.run(...args)
            );

        }

    }


}
