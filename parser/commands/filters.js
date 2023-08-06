import { endOfInput, everyCharUntil, str } from 'arcsecond'
import {
	betweenWhitespace,
	command,
	commandClass,
	namedArguments,
} from '../util.js'

export const filtersParser = commandClass('filters', [
	command({
		id: 'add_filter',
		text: 'add filter',
		contentParser: namedArguments({
			'filter*': everyCharUntil(betweenWhitespace(str('-'))),
			'_*': str('-'),
			'reply*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'remove_filter',
		text: 'remove filter',
		contentParser: namedArguments({
			'filter*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'edit_filter',
		text: 'edit filter',
		contentParser: namedArguments({
			'filter*': everyCharUntil(betweenWhitespace(str('-'))),
			'_*': str('-'),
			'new_reply*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'show_filters',
		text: 'show filters',
	}),
])
