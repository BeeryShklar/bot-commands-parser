import {
	Parser,
	anyChar,
	between,
	char,
	choice,
	endOfInput,
	many,
	many1,
	namedSequenceOf,
	optionalWhitespace,
	possibly,
	sepBy,
	sepBy1,
	sequenceOf,
	str,
	takeRight,
	whitespace,
} from 'arcsecond'
import { dictionary } from '../dictionary.js'
import {
	flattenFull,
	getCommonIdentifier,
	getContainerKey,
	getIdentifierInObject,
} from '../util/objectsUtils.js'

export const endOfMessage = sequenceOf([optionalWhitespace, endOfInput]).map(
	x => null
)

/**
 * Creates a choice parser from given strings
 * @param {string[]} arr array of string
 * @returns a choice parser for every given string
 */
export const stringChoice = arr => choice(arr.map(s => str(s)))

export const joinedSequenceOf = parsersArr =>
	sequenceOf(parsersArr).map(x => x.join(''))

/**
 * Creates a choice between End Of Input or the given parser
 * @param {Parser} p parser
 * @returns new parser
 */
export const possiblyOrEOI = p => choice([p, endOfMessage])

/**
 * adds whitespace before parser and removes whitespace from output
 * @param {Parser} p parser
 * @returns new parser
 */
export const whitespaceBefore = takeRight(whitespace)

/**
 * This parser tags the commands in its group with the given group ID
 * @param {string} id group identifier
 * @param {Parser[]} commands commands that fall under this group
 * @returns The command group parser
 */
export const commandClass = (id, commands) =>
	choice(commands).map(x => ({ class_id: id, ...x }))

/**
 *
 * @param {string} ID Identifier for string in the dictionary
 * @param {string} def default value if there is no dictionary entry
 * @param {boolean} extendedData add more information to the return object
 * @returns A choice parser with the requested string in every language
 */
export const getMultiLanguageChoice = (ID, def, extendedData) => {
	const translations = dictionary[ID]
	if (
		!(dictionary instanceof Object) ||
		translations === null ||
		translations === undefined
	) {
		return def instanceof Array
			? stringChoice(def)
			: str(def ?? 'no default text found')
	}

	const englishTranslation = translations['english']
	const translationValues = Object.values(translations)
	const translationsValuesFlat = flattenFull(translationValues)
	const parser = stringChoice(translationsValuesFlat)

	let mapFunction = x => x
	if (extendedData) {
		mapFunction = x => {
			const id = getCommonIdentifier(x, translations, englishTranslation)
			const language = getContainerKey(x, translations)

			const t = translations
			const container = translations[language]

			return {
				id,
				text: x,
				language,
				strID: ID,
				identifierInContainer:
					typeof container !== 'string'
						? getIdentifierInObject(x, container)
						: 0,
			}
		}
	}

	return parser.map(mapFunction)
}

/**
 * A template for creating command parsers
 * @param {{text: string, id: string, contentParser: Parser}}
 * @param {string} groupID Identifier for this commands category. i.e. birthdays, filters, etc.
 * @returns A new parser with the right output format
 */
export const command = ({ id, text, contentParser }, groupID = null) => {
	// const cmdNameParser =
	// 	text instanceof Array ? choice(text.map(x => str(x))) : str(text)
	const cmdNameParser = getMultiLanguageChoice(`commands.${id}`, text, true)
	const p = sequenceOf([
		optionalWhitespace,
		cmdNameParser,
		contentParser ?? optionalWhitespace.map(x => null),
	]).map(([_, { text, language }, data]) => ({
		id,
		text,
		language,
		data,
	}))

	if (groupID) return commandClass(groupID, [p])
	return p
}

/**
 * Maps to parser output to be inside of an object with a specified key
 * @param {Parser} p parser
 * @param {string} tag name of tag
 * @returns void
 */
export const tag = (p, tag) => p.map(x => ({ [tag]: x }))

/**
 * Adds whitespace around parser
 * @param {Parser} p parser
 * @returns void
 */
export const betweenWhitespace = between(whitespace)(
	choice([endOfInput, whitespace])
)
/**
 * Adds optional whitespace around parser
 * @param {Parser} p parser
 * @returns void
 */
export const betweenOptionalWhitespace =
	between(optionalWhitespace)(optionalWhitespace)

/**
 * Coma separated object from given parser
 * @param {Parser} p parser
 * @returns new parser of comma separated parser objects
 */
export const commaSeparated = sepBy(sequenceOf([char(','), optionalWhitespace]))
export const commaSeparated1 = sepBy1(
	sequenceOf([char(','), optionalWhitespace])
)

/**
 * Creates a parser for name parameters.
 *
 * Add a '*' at the end of the parameter's name to make it required.
 * @param {{[name: string]: Parser}} obj the object holding the parsers and their keys
 * @returns a parser for the requested parameters
 */
export const namedArguments = obj => {
	const arr = Object.entries(obj)
	return namedSequenceOf(
		arr.map(([s, p]) => {
			let parser
			if (s[s.length - 1] === '*')
				parser = [s.slice(0, -1), whitespaceBefore(p)]
			else if (s[s.length - 1] === '^') parser = [s.slice(0, -1), p]
			else parser = [s, possibly(whitespaceBefore(p))]

			if (s.startsWith('_')) parser[1] = parser[1].map(x => null)

			return parser
		})
	)
}

export const anyString = many(anyChar).map(x => x.join(''))
export const anyString1 = many1(anyChar).map(x => x.join(''))
