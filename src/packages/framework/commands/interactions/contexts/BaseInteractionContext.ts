import { constants } from '@naya/util';
import { env } from '@naya/util/constants';
import { BaseGuildTextChannel, GuildMember, Interaction } from 'discord.js';
import { BaseContext } from '../../bases/BaseContext';
import { Interactionhandler } from '../CommandHandler';
/**
 * base extendable context for interaction related commands.
 * such as buttons, slash commands, user commands etc.
 */
export class BaseInteractionContext extends BaseContext<'interactions'> {
    /**
     * the interaction it's refering to
     */
    interaction: Interaction;

    constructor(handler: Interactionhandler, interaction: Interaction) {
        super(handler);
        this.interaction = interaction;
    }

    /**
     * utility class to if the bot user has permission to
     * use external emojis or only the default ones
     * in dms it will always use external emoijis.
     */
    public emote(emote: keyof typeof constants['emojis']['custom']) {
        if (!this.interaction.channel) return '';
        if (this.interaction.channel?.isDMBased()) {
            return constants.emojis.custom[emote];
        }
        if (this.interaction.channel instanceof BaseGuildTextChannel) {
            return this.interaction.channel
                .permissionsFor(constants.env.get('CLIENT_ID')!)
                ?.has('UseExternalEmojis')
                ? constants.emojis.custom[emote]
                : constants.emojis.default[emote];
        }
        return constants.emojis.custom[emote];
    }

    get env() {
        return env;
    }

    get author() {
        return this.interaction.user;
    }

    get member() {
        return this.interaction.member instanceof GuildMember
            ? this.interaction.member
            : null;
    }

    get guild() {
        return this.interaction.guild;
    }

    get channel() {
        return this.interaction.channel;
    }
}
