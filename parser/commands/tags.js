import { char, choice, endOfInput, everyCharUntil, str } from 'arcsecond'
import { phoneNumber } from '../types.js'
import {
	betweenWhitespace,
	commaSeparated1,
	command,
	commandClass,
	getMultiLanguageChoice,
	namedArguments,
	possiblyOrEOI,
} from '../util.js'

export const tagsParser = commandClass('tags', [
	command({
		id: 'tag',
		text: 'tag',
		contentParser: namedArguments({
			'person*': choice([
				getMultiLanguageChoice('types.tag_special_groups', null, true),
				everyCharUntil(endOfInput),
			]),
		}),
	}),
	command({
		id: 'add_tag_buddy',
		text: 'add tag buddy',
		contentParser: namedArguments({
			'name*': everyCharUntil(betweenWhitespace(str('-'))),
			'_*': str('-'),
			'phone*': phoneNumber,
		}),
	}),
	command({
		id: 'remove_tag_buddy',
		text: 'remove tag buddy',
		contentParser: namedArguments({
			'name*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'add_tag_group',
		text: 'add tag group',
		contentParser: namedArguments({
			'name*': everyCharUntil(betweenWhitespace(str('-'))),
			'_*': str('-'),
			'people*': commaSeparated1(everyCharUntil(possiblyOrEOI(char(',')))),
		}),
	}),
	command({
		id: 'remove_tag_group',
		text: 'remove tag group',
		contentParser: namedArguments({
			'name*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'show_tag_buddies',
		text: 'show tag buddies',
	}),
	command({
		id: 'check_where_ive_been_tagged',
		text: "check where I've been tagged",
	}),
	command({
		id: 'clear_my_tags',
		text: 'clear my tags',
	}),
	command({
		id: 'activate_dnd',
		text: ['activate do not disturb', '!afk'],
	}),
])
