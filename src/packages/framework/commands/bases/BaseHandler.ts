import { FrameworkModuleHandler } from '@naya/framework/modules/ModuleHandler';
import { BaseCommand } from './BaseCommand';

export class BaseCommandHandler<
    Command extends BaseCommand
> extends FrameworkModuleHandler<Command> {}
