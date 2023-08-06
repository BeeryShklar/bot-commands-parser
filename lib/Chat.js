export class Chat {
	/**
	 * @typedef {'english' | 'hebrew' | 'french'} language
	 * @type {language}
	 */
	#language = 'english'
	/** @type {boolean} */
	#replyInRequestLanguage = false

	/**
	 *
	 * @typedef {{language: language, replyInRequestLanguage: boolean}} ChatArguments
	 * @param {ChatArguments} Chat arguments
	 */
	constructor({ language, replyInRequestLanguage }) {
		this.#language = language
		this.#replyInRequestLanguage = replyInRequestLanguage
	}

	get language() {
		return this.#language
	}

	set language(newLang) {
		this.#language = newLang
	}

	get replyInRequestLanguage() {
		return this.#replyInRequestLanguage
	}

	set replyInRequestLanguage(val) {
		this.#replyInRequestLanguage = val
	}
}
