import { regex } from 'arcsecond'
import { url } from '../types.js'
import { command, commandClass, namedArguments } from '../util.js'

export const miscellaneousParser = commandClass('miscellaneous', [
	command({
		id: 'profile',
		text: 'profile',
	}),
	command({
		id: 'change_link_type',
		text: 'change link type',
		contentParser: namedArguments({
			'link*': url,
		}),
	}),
	command({
		id: 'my_guess_is',
		text: 'my guess is',
		contentParser: namedArguments({
			'guess*': regex(/^\w{5}$/),
		}),
	}),
	// TODO: Create survey command
])
