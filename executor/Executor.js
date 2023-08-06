import { Bot } from '../lib/Bot.js'
import { Chat } from '../lib/Chat.js'
import { color } from '../util/consoleUtils.js'
import { HelpExecutor } from './executors/HelpExecutor.js'
import { LanguageExecutor } from './executors/LanguageExecutor.js'
import { objectMap } from './util.js'

const executorClasses = {
	languages: LanguageExecutor,
	help: HelpExecutor,
}

export class Executor {
	constructor() {
		this.executors = objectMap(executorClasses, executor => new executor())
	}

	/**
	 * Executes the given command
	 * @param {import('arcsecond').ParserState} parseTree parsed command tree
	 * @param {Chat} user
	 * @param {Bot} bot the bot controller
	 * @returns {void}
	 */
	execute(parseTree, chat, bot) {
		const { result: req } = parseTree

		if (parseTree.isError)
			return bot.error(chat, bot, {
				title: `Couldn't parse input at position ${color(
					parseTree.index,
					'brown'
				)}`,
				body: parseTree.error,
			})

		const classID = req['class_id']
		const executor = this.executors[classID]
		if (!executor) bot.error(chat)
		executor.execute(req, chat, bot)
	}
}
