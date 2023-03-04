import { applyOptions } from '@naya/decorators/commands';
import { env } from '@naya/env';
import { Language, LanguageOptions } from '@naya/i18n/Language';
import { Markdown } from '@naya/util/Markdown';
import { Locale } from 'discord.js';

@applyOptions<LanguageOptions>({
    id: Locale.EnglishGB,
    data: {
        ERRORS: {
            ERROR_FATAL: (ctx, error, command) => {
                const botenv = env.get('BOT_ENV');
                const footer = botenv === 'dev' ?
                    'please report it in the #beta-support channel of' :
                    botenv === 'premium' ?
                        'please report it in the #premium-support channel of ' :
                        'please report it in the #support channel of';


                return [
                    `${ctx.emote('error')} konnte diesen Command nicht ausführen: ${Markdown.code(command, 'inline')}.`,
                    Markdown.code(`${error.name}:${error.message}`, 'block', 'js'),
                    `You should not receive errors like this, ${footer}: ${env.get('DISCORD_TOKEN', 'none')}`
                ].join('\n');
            }
        },
        SYSTEM: {
            CLIENT_PRESENCE: (data) => `/help | ${data.guilds} servers`,
            CLIENT_READY: (username, data) => {
                return `${username} is now ready on ${data.guilds} servers.`;
            },

        }
    }
})
export default class EnglishTraditional extends Language { }
// 
