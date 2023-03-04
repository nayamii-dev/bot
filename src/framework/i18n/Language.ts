import { Component, ComponentOptions } from '@naya/components/Component';
import { LanguageData, LocaleStringCustom } from '@naya/typings/language';
import { LanguageKeyInvalid } from './LanguageError';

export interface LanguageOptions extends ComponentOptions {
    id: LocaleStringCustom;
    data: LanguageData;
}

export class Language extends Component {

    data: LanguageData;
    declare options: LanguageOptions;

    constructor(options: LanguageOptions) {
        super(options);
        this.data = options.data;
    }

    get<Key extends keyof LanguageData>(key: Key): LanguageData[Key] | null {
        if (!(key in this.data)) {
            throw new LanguageKeyInvalid(this.options.id, key);
        }
        const res = this.data[key] as any;

        if (res) {
            return res;
        }
        return null;
    }
}
