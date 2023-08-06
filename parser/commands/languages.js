import { language } from '../types.js'
import { betweenOptionalWhitespace, command, tag } from '../util.js'

export const languagesParser = command(
	{
		id: 'change_language',
		text: 'change language to',
		contentParser: betweenOptionalWhitespace(tag(language, 'language')),
	},
	'languages'
)
