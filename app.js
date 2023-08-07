import { Message } from 'discord.js'
import dotenv from 'dotenv'
import { Executor } from './executor/Executor.js'
import { Bot } from './lib/Bot.js'
import { InputParser } from './parser/InputParser.js'

dotenv.config()

const bot = new Bot()
const parser = new InputParser()
const executor = new Executor()

bot.start()

bot.on('command', (message, chat) => {
	const parseTree = parser.parse(message.content)
	console.log(JSON.stringify(parseTree, null, 2))

	executor.execute(parseTree, message, chat, bot, {
		ignoreCommandIDErrors: true,
	})
})

bot.on('dm', (/** @type {Message} */ message, chat) => {
	const parseTree = parser.parse(message.content)
	console.log('DM Message:', JSON.stringify(parseTree, null, 2))

	executor.execute(parseTree, message, chat, bot, {
		ignoreCommandIDErrors: false,
	})
})

bot.on('stop', () => {
	console.log('bot stopped')
})
