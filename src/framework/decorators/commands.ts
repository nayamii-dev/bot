import { ComponentOptions } from '@naya/components/Component';


export function applyOptions<Options extends ComponentOptions>(
    options: Options
) {

    return (cls: any): any => {
        class T extends cls {

            constructor() {
                super(options);
            }
        }

        return T;
    };
}
