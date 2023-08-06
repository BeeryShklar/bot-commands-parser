import { date } from '../types.js'
import { command, commandClass, namedArguments } from '../util.js'

export const birthdaysParser = commandClass('birthdays', [
	command({
		id: 'add_birthday',
		text: 'add birthday',
		contentParser: namedArguments({
			date,
		}),
	}),
	command({
		id: 'remove_birthday',
		text: 'remove birthday',
	}),
	command({
		id: 'show_birthdays',
		text: 'show birthdays',
	}),
	command({
		id: 'add_group_to_birthday_broadcast',
		text: 'add group to birthday broadcast',
	}),
	command({
		id: 'remove_group_from_birthday_broadcast',
		text: 'remove group from birthday broadcast',
	}),
])
