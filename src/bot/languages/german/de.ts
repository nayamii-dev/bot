
import { applyOptions } from '@naya/decorators/commands';
import { env } from '@naya/env';
import { Language, LanguageOptions } from '@naya/i18n/Language';
import { Markdown } from '@naya/util/Markdown';
import { Locale } from 'discord.js';

@applyOptions<LanguageOptions>({
    id: Locale.German,
    data: {
        SYSTEM: {
            CLIENT_PRESENCE: ({ guilds }) => {
                return `/hilfe | ${guilds} Server.`;
            },
            CLIENT_READY: (username) => {
                return `${username} ist einsatzbereit.`;
            }
        },
        ERRORS: {
            ERROR_FATAL: (ctx: any, error, command: string) => {
                const botenv = env.get('BOT_ENV');
                const footer = botenv === 'dev' ?
                    'bitte reporte ihn in dem #beta-support Kanal des Servers' :
                    botenv === 'premium' ?
                        'Bitte reporte ihn in dem #premium-support Kanal des Servers' :
                        'Bitte reporte ihn in dem #support kanal des Servers';
                return [
                    `${ctx.emote('error')} failed to run command: ${Markdown.code(command, 'inline')} `,
                    Markdown.code(`${error.name}:${error.message}`, 'block', 'js'),
                    `Du solltest nicht solche Fehler erhalten, ${footer}: ${env.get('SUPPORT_SERVER')}`
                ].join('\n');
            }
        }
    }
})
export default class German extends Language { }
