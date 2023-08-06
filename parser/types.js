import { everyCharUntil, regex, whitespace } from 'arcsecond'

import { getMultiLanguageChoice, possiblyOrEOI } from './util.js'

/// Parser types ///
export const word = everyCharUntil(possiblyOrEOI(whitespace))

/// Regex types ///
export const date = regex(
	/^(0?[1-9]|[12][0-9]|3[01])[\/\\.-](0?[1-9]|1[012])[\/\\.-]\d{4}/
)
export const time = regex(/^(2[0-3]|[0-1]?[\d]):[0-5][\d]/)

export const phoneNumber = regex(
	/^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
)
export const youtubeURL = regex(
	/^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
)
export const url = regex(
	/^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
)

/// String types ///
// These types use the dictionary
export const color = getMultiLanguageChoice('types.colors', null, true)
export const weekDay = getMultiLanguageChoice('types.weekdays', null, true)
export const language = getMultiLanguageChoice('types.languages', null, true)

export const toggleState = getMultiLanguageChoice(
	'types.toggle_state',
	null,
	true
).errorMap(e => '{errors.invalid_toggle_state}')

export const permission = getMultiLanguageChoice(
	'types.permissions',
	null,
	true
)
export const permissionLevel = getMultiLanguageChoice(
	'types.permission_levels',
	null,
	true
)

export const helpSubcmd = getMultiLanguageChoice(
	'types.help_subcommands',
	null,
	true
)
