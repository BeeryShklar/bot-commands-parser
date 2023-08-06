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
	execute(req, chat, bot) {
		const { subcmd } = req.data
		if (!subcmd) bot.respond(chat, req, { byID: 'help.general_message' })
		else bot.respond(chat, req, { byID: `help.${subcmd.id}_message` })
	}
}
