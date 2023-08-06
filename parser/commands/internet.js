import { endOfInput, everyCharUntil, regex } from 'arcsecond'
import { url, word, youtubeURL } from '../types.js'
import { command, commandClass, namedArguments } from '../util.js'

export const internetParser = commandClass('internet', [
	command({
		id: 'check_crypto',
		text: 'check crypto',
	}),
	command({
		id: 'check_stock',
		text: 'check_stock',
		contentParser: namedArguments({
			'symbol*': regex(/^\$[a-z]{2,5}\b|\$?\b[A-Z]{2,5}\b/),
		}),
	}),
	command({
		id: 'internet_definition',
		text: 'internet_definition',
		contentParser: namedArguments({
			'word*': word,
		}),
	}),
	command({
		id: 'translate_to',
		text: 'translate to',
		contentParser: namedArguments({
			'language*': word,
			'text*': everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'download_music',
		text: 'download music',
		contentParser: namedArguments({
			'link*': youtubeURL,
		}),
	}),
	command({
		id: 'transcribe_audio',
		text: 'transcribe audio',
	}),
	command({
		id: 'scan',
		text: 'scan',
		contentParser: namedArguments({
			'link*': url,
		}),
	}),
])
