/**
 *
 * @param {string} str string to format
 * @param {(substring, ...args) => string} func replacer function
 * @returns
 */
export const stringFormat = (str, func) =>
	str.replace(/{([\w\.-]+)}/, (_, s) => func(s))

/**
 *
 * @param {string} str string to parse
 * @param {{[name: string]: string}} params parameters to replace in the string
 */
export const parseStringParams = (str, params) => {
	if (!params) return str
	Object.entries(params).forEach(([name, value]) => {
		str = str.replaceAll(`{${name}}`, value ?? '{no value}')
	})
	return str
}
