import { FrameworkBaseModuleOptions } from '@naya/framework/modules/FrameworkModule';

export function createDecorator(fn: (...args: any) => any) {
    return fn;
}

export function applyOptions<Opts extends FrameworkBaseModuleOptions>(options: Opts) {

    return createDecorator((cls: any) => {

        class ExtendedModule extends cls {
            constructor() {
                super(options);
            }
        }

        return ExtendedModule as any;
    });
}
