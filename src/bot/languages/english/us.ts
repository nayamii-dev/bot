import { applyOptions } from '@naya/decorators/commands';
import { env } from '@naya/env';
import { Language, LanguageOptions } from '@naya/i18n/Language';
import { Markdown } from '@naya/util/Markdown';
import { Locale } from 'discord.js';

@applyOptions<LanguageOptions>({
    id: Locale.EnglishUS,
    data: {
        SYSTEM: {
            CLIENT_PRESENCE: (data) => `/help | ${data.guilds} servers`,
            CLIENT_READY: (username, data) => {
                return `${username} is now ready on ${data.guilds} servers.`;
            },

        },
        ERRORS: {
            ERROR_FATAL: (ctx: any, error, command: string) => {
                const botenv = env.get('BOT_ENV');
                const footer = botenv === 'dev' ?
                    'please report it in the #beta-support channel of' :
                    botenv === 'premium' ?
                        'please report it in the #premium-support channel of ' :
                        'please report it in the #support channel of';

                return [
                    `${ctx.emote('error')} konnte diesen Command nicht ausführen: ${Markdown.code(command, 'inline')}.`,
                    Markdown.code(`${error.name}:${error.message}`, 'block', 'js'),
                    `You shouldn't receive errors like this, ${footer}: ${env.get('SUPPORT_SERVER', 'none')}`
                ].join('\n');
            }
        }
    }
})
export default class EnglishSimplified extends Language { }
