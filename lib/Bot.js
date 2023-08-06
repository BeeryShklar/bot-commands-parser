import { EventEmitter } from 'events'
import readline from 'readline/promises'
import { dictionaryGet } from '../dictionary.js'
import { color, colors } from '../util/consoleUtils.js'
import { everythingMap } from '../util/objectsUtils.js'
import { stringFormat } from '../util/stringUtils.js'
import { Chat } from './Chat.js'

export class Bot extends EventEmitter {
	/**@type {import('readline').ReadLine} */
	static #rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
	static #chat = new Chat({
		language: 'english',
		replyInRequestLanguage: true,
	})

	#isRunning = false

	constructor() {
		super({})
	}

	async start() {
		this.#isRunning = true
		while (this.#isRunning) {
			const msg = await Bot.#rl.question('Enter your command:\n> ')
			this.emit('message_to_bot', { chat: Bot.#chat, content: msg })
			this.emit('message', { chat: Bot.#chat, content: msg })
		}
	}

	async stop() {
		Bot.#rl.close()
	}

	/**
	 * Handles forwarding the reply to the user
	 *
	 * @typedef {'error' | 'default'} BotResponseType
	 * @typedef {{type?: MessageType, byID?: string, body?: string, params: {[name: string]: string}}} BotResponse
	 * @param {Chat} chat chat to send the message in
	 * @param {BotResponse | string} res object/string describing what the response to the user should be
	 */
	respond(chat, req, res) {
		const language =
			(chat.replyInRequestLanguage && req.language
				? req.language
				: chat.language) ?? 'english'

		if (!res) throw new Error("No response object in 'Bot.respond'")
		if (typeof res === 'string') res = { msg: res }

		if (res.byID) {
			// set response body and/or title by dictionary id
			const translation = dictionaryGet(res.byID, language, true, res.params)
			if (typeof translation === 'string') res.body = translation
			else res = { ...res, ...translation }
		}

		res = everythingMap(res, x =>
			typeof x === 'string' ? this.#formatText(x, language) : x
		)

		const str = this.#getResponseTemplate(res.type, language)(res)
		console.log(str)
	}

	/**
	 *
	 * @param {*} resType
	 * @returns {(BotResponse) => string} a function which, given a BotResponse object, returns a string
	 */
	#getResponseTemplate(resType, language) {
		const generalErrorText = dictionaryGet('errors.general_error', language)

		switch (resType) {
			case 'error':
				return ({ title, body }) => `----------------------------\n
${color('>', 'dim')} ${colors.red}${title ?? generalErrorText?.title}
${colors.reset}${body ?? generalErrorText?.body}
\n----------------------------`
			default:
				return ({ body }) => `----------------------------\n
${color('>', 'dim')} ${color(
					dictionaryGet('bot.new_message', language),
					'yellow'
				)}
${body}
\n----------------------------`
		}
	}

	/**
	 *
	 * @param {Chat} chat chat to send error in
	 * @param {BotResponse} res bot response object
	 * @returns
	 */
	error(chat, req, res) {
		return this.respond(chat, req, {
			type: 'error',
			...res,
		})
	}

	/**
	 * Replaces IDs inside curly brackets ("{string.in.dictionary}") with dictionary items in specified language.
	 * @param {string} str string to parse
	 * @param {*} language language to query from dictionary
	 * @returns The string with every template replaced from dictionary
	 */
	#formatText(str, language) {
		return stringFormat(str, s => dictionaryGet(s, language, true))
	}
}
