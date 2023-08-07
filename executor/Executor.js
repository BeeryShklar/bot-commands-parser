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
	 * @typedef {{ignoreCommandIDErrors: boolean}} ExecuteOptions
	 * @param {ExecuteOptions} options
	 * @returns {void}
	 */
	execute(parseTree, req, chat, bot, options) {
		const { result: parsed } = parseTree

		if (parseTree.isError) {
			if (parseTree.index < 1 && options.ignoreCommandIDErrors) return false
			console.log('----- ERROR -----')
			return bot.error(req, chat, parsed, {
				title: `Couldn't parse input at position ${color(
					parseTree.index,
					'brown'
				)}`,
				body: parseTree.error,
			})
		}

		const classID = parsed['class_id']
		const executor = this.executors[classID]
		if (!executor)
			return bot.error(req, chat, parsed, {
				body: 'No executor for command', // TODO: add this message in the dictionary
			})
		executor.execute(parsed, req, chat, bot)
	}
}
