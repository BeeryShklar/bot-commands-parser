import { endOfInput, everyCharUntil } from 'arcsecond'
import { color } from '../types.js'
import {
	command,
	commandClass,
	getMultiLanguageChoice,
	namedArguments,
} from '../util.js'

export const stickersParser = commandClass('stickers', [
	command({
		id: 'convert_sticker',
		text: 'convert to sticker',
		contentParser: namedArguments({
			crop: getMultiLanguageChoice('types.sticker_crop_options', null, true),
			quality: getMultiLanguageChoice('types.sticker_quality', null, true),
		}),
	}),
	command({
		id: 'create_text_sticker',
		text: 'create text sticker',
		contentParser: namedArguments({
			color,
			'text*': everyCharUntil(endOfInput),
		}),
	}),
])
