import { char, endOfInput, everyCharUntil, str } from 'arcsecond'
import { permission, permissionLevel } from '../types.js'
import {
	command,
	commandClass,
	joinedSequenceOf,
	namedArguments,
} from '../util.js'

export const permissionsParser = commandClass('permissions', [
	command({
		id: 'define_permissions_for',
		text: 'define permissions for',
		contentParser: namedArguments({
			'permission*': permission,
			'_*': str('-'),
			'type*': permissionLevel,
		}),
	}),
	command({
		id: 'mute',
		text: 'mute',
		contentParser: namedArguments({
			'person*': joinedSequenceOf([char('@'), everyCharUntil(endOfInput)]),
		}),
	}),
	command({
		id: 'unmute',
		text: 'unmute',
		contentParser: namedArguments({
			'person*': joinedSequenceOf([char('@'), everyCharUntil(endOfInput)]),
		}),
	}),
	command({
		id: 'show_function_permissions',
		text: 'show function permissions',
	}),
	command({
		id: 'show_people_permissions',
		text: 'show people permissions',
	}),
])
