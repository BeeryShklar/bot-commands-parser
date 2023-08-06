import { readFileSync } from 'fs'
import { parse } from 'yaml'
import { recursiveMap } from './util/objectsUtils.js'
import { parseStringParams } from './util/stringUtils.js'

const str = readFileSync('./dictionary.yml', 'utf8')
export const dictionary = parse(str)

/**
 * Returns a string from dictionary in the appropriate language
 * @param {string} strID String identifier in the dictionary
 * @param {'english' | 'hebrew' | 'french'} language target language
 * @param {boolean} defaultReturn return strID instead of null if not found
 * @param {{[name: string]: string}} params name of parameters in the string to replace with values
 */
export function dictionaryGet(strID, language, defaultReturn = false, params) {
	const translations = dictionary[strID]
	if (!translations || !translations[language])
		return defaultReturn ? strID : null
	const mapped = recursiveMap(translations[language], x =>
		parseStringParams(x, params)
	)
	return mapped
}
