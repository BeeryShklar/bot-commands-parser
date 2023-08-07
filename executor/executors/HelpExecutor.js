import { Bot } from '../../lib/Bot.js'
import { Executor } from '../Executor.js'

/**
 * @implements {Executor}
 */
export class HelpExecutor {
	/**
	 *
	 * @override
	 * @param {*} cmd
	 * @param {*} user
	 * @param {Bot} bot
	 */
	execute(parsed, req, chat, bot) {
		const { subcmd } = parsed.data
		if (!subcmd)
			bot.respond(req, chat, parsed, { byID: 'help.general_message' })
		else bot.respond(req, chat, parsed, { byID: `help.${subcmd.id}_message` })
	}
}
