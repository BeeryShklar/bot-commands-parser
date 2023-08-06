import { choice, endOfInput, everyCharUntil } from 'arcsecond'
import { date, time, weekDay } from '../types.js'
import {
	command,
	commandClass,
	getMultiLanguageChoice,
	namedArguments,
} from '../util.js'

export const remindersParser = commandClass('reminders', [
	command({
		id: 'add_reminder',
		text: 'add reminder',
		contentParser: namedArguments({
			repeat: getMultiLanguageChoice('reminders.repeat', null, true),
			date: choice([date, weekDay]),
			time: time,
			msg: everyCharUntil(endOfInput),
		}),
	}),
	command({
		id: 'remove_reminder',
		text: 'remove reminder',
		contentParser: namedArguments({
			date: choice([date, weekDay]),
			time: time,
		}),
	}),
	command({
		id: 'show_reminders',
		text: 'show reminders',
	}),
])
