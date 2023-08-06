import { choice } from 'arcsecond'
import { birthdaysParser } from './commands/birthdays.js'
import { developersParser } from './commands/developers.js'
import { filtersParser } from './commands/filters.js'
import { helpParser } from './commands/help.js'
import { internetParser } from './commands/internet.js'
import { languagesParser } from './commands/languages.js'
import { miscellaneousParser } from './commands/miscellaneous.js'
import { permissionsParser } from './commands/permissions.js'
import { remindersParser } from './commands/reminders.js'
import { stickersParser } from './commands/stickers.js'
import { tagsParser } from './commands/tags.js'

const parsers = [
	helpParser,
	languagesParser,
	birthdaysParser,
	remindersParser,
	stickersParser,
	filtersParser,
	tagsParser,
	permissionsParser,
	internetParser,
	miscellaneousParser,
	developersParser,
]

export class InputParser {
	constructor() {
		this.parser = choice(parsers)
	}

	/**
	 * Parses a message and returns an object with the relevant information in the message,
	 * i.e. type of command, parameters, etc.
	 * @param {String} str string to parse
	 * @returns parse tree
	 */
	parse(input) {
		const result = this.parser.run(input)
		return result
	}
}
