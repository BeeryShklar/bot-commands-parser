import { Executor } from './executor/Executor.js'
import { Bot } from './lib/Bot.js'
import { InputParser } from './parser/InputParser.js'

const bot = new Bot()
const parser = new InputParser()
const executor = new Executor()

bot.start()

bot.on('message', ({ chat, content }) => {
	const parseTree = parser.parse(content)
	console.log(JSON.stringify(parseTree, null, 2))

	executor.execute(parseTree, chat, bot)
})

bot.on('stop', () => {
	console.log('bot stopped')
})
