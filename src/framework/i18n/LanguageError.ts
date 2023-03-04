import { LocaleStringCustom } from '@naya/typings/language';

class _LanguageError extends ReferenceError {

    constructor(readonly language: LocaleStringCustom, message: string) {
        super(message);
    }
}


export class LanguageKeyInvalid extends _LanguageError {
    constructor(language: LocaleStringCustom, key: string) {
        super(language, `the key ${key} on language ${language} does not exist.`);
    }
}

export class LanguageError extends _LanguageError { }
