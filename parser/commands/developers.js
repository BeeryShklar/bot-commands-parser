import { endOfInput, everyCharUntil } from 'arcsecond'
import { url } from '../types.js'
import { command, commandClass, namedArguments } from '../util.js'

export const developersParser = commandClass('developers', [
	command({
		id: 'ban',
		text: '/ban',
		contentParser: namedArguments({
			'user*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'unban',
		text: '/unban',
		contentParser: namedArguments({
			'user*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'block',
		text: '/block',
		contentParser: namedArguments({
			'group*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'unblock',
		text: '/unblock',
		contentParser: namedArguments({
			'group*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'join',
		text: 'join',
		contentParser: namedArguments({
			'link*': url,
		}),
	}),
	command({
		id: 'ping',
		text: '!ping',
	}),
	command({
		id: 'exec',
		text: '/exec',
		contentParser: namedArguments({
			'command*': everyCharUntil(endOfInput),
		}),
	}),
])
