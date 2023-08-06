import { endOfInput, optionalWhitespace, sequenceOf } from 'arcsecond'
import { helpSubcmd, toggleState } from '../types.js'
import { command, commandClass, namedArguments } from '../util.js'

// export const helpParser = sequenceOf([
// 	str('help'),
// 	possiblyOrEOI(whitespaceBefore(subcommand)),
// ]).map(([cmd, subcmd]) => ({
// 	cmd,
// 	subcmd,
// }))

export const helpParser = commandClass('help', [
	command({
		id: 'help',
		text: 'help',
		contentParser: namedArguments({
			subcmd: helpSubcmd,
			'_^': sequenceOf([optionalWhitespace, endOfInput]).errorMap(
				e => '{errors.help_page_not_found}'
			),
		}),
	}),
	command({
		id: 'reply_in_message_language',
		text: 'reply in message language',
		contentParser: namedArguments({
			isOn: toggleState,
		}),
	}),
])
