import {
	Client,
	Events,
	GatewayIntentBits,
	Message,
	Partials,
} from 'discord.js'
import { EventEmitter } from 'events'
import { dictionaryGet } from '../dictionary.js'
import { color, colors } from '../util/consoleUtils.js'
import { everythingMap } from '../util/objectsUtils.js'
import { stringFormat } from '../util/stringUtils.js'
import { Chat } from './Chat.js'

export class Bot extends EventEmitter {
	static #chat = new Chat({
		language: 'english',
		replyInRequestLanguage: true,
	})

	#isRunning = false
	#client

	constructor() {
		super({})
		this.#client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
			],
			partials: [Partials.Channel],
		})
		this.#client.on(Events.ClientReady, () => {
			this.start()
			this.#isRunning = true
			console.log(`Logged in as ${this.#client.user.tag}!`)
		})
		this.#client.on(Events.MessageCreate, async message => {
			if (message.partial) {
				console.log('--- MESSAGE IS PARTIAL 🥵 ---')
				message = await message.fetch()
			}

			if (message.author.bot) return null
			if (message.channel.isDMBased(h))
				return this.emit('dm', message, Bot.#chat)

			this.emit('message', message, Bot.#chat)

			const formattedMessage = message
			formattedMessage.content = formattedMessage.content.replace(
				/^<@\d+>\s/,
				''
			)
			console.log(JSON.stringify(formattedMessage, null, 2))
			this.emit('command', formattedMessage, Bot.#chat)
		})
	}

	async start() {
		this.#client.login(this.#client.token)
	}

	async stop() {
		await this.#client.destroy()
		return this.emit('stop')
	}

	/**
	 * Handles forwarding the reply to the user
	 *
	 * @typedef {'error' | 'default'} BotResponseType
	 * @typedef {{type?: MessageType, byID?: string, body?: string, params: {[name: string]: string}}} BotResponse
	 * @param {Message} req chat to send the message in
	 * @param {Chat} chat chat to send the message in
	 * @param {BotResponse | string} res object/string describing what the response to the user should be
	 */
	respond(req, chat, parsed, res) {
		const language =
			(chat.replyInRequestLanguage && parsed?.language
				? parsed.language
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

		const str = res
		console.log(this.#getTemplateForConsole(str.type, language)(res))
		req.reply({
			content: str.body,
		})
		switch (str.type) {
			case 'error':
				req.react('🚨')
				break
			default:
				// req.react('👍')
				break
		}
	}

	/**
	 *
	 * @param {*} resType
	 * @returns {(BotResponse) => string} a function which, given a BotResponse object, returns a string
	 */
	#getTemplateForConsole(resType, language) {
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
	error(req, chat, parsed, res) {
		console.log('Erros is:', res)
		return this.respond(req, chat, parsed, {
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
