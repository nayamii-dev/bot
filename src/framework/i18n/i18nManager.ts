import { ComponentHandler } from '@naya/components/ComponentHandler';
import { LanguageData, LocaleStringCustom } from '@naya/typings/language';
import EnglishSimplified from '@naya/../bot/languages/english/us';
import { Collection } from 'discord.js';
import { Language } from './Language';
import { LanguageError, LanguageKeyInvalid } from './LanguageError';

export class I18nManager extends ComponentHandler<Language> {

    guildLanguages: Collection<string, LocaleStringCustom> = new Collection();
    //@ts-expect-error
    defaultLanguage: Language = new EnglishSimplified();


    parse(guildId: string, key: keyof LanguageData,) {
        const locale = this.getLocale(this.guildLanguages.get(guildId) ?? 'en-US');
        if (!locale) {
            throw new LanguageError('en-GB', `locale not registered.`);
        }
        const res = locale?.get(key);
        if (!res) {
            throw new LanguageKeyInvalid(locale?.options.id, key);
        }
    }


    getLocale(locale: LocaleStringCustom) {
        return this.components.get(locale);
    }

}
