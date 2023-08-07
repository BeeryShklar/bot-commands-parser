import { dictionaryGet } from '../../dictionary.js'
import { Bot } from '../../lib/Bot.js'
import { Chat } from '../../lib/Chat.js'
import { getIdentifierInObject } from '../../util/objectsUtils.js'
import { Executor } from '../Executor.js'

/**
 * @extends {Executor}
 */
export class LanguageExecutor {
	/**
	 *
	 * @param {*} parsed
	 * @param {Chat} chat
	 * @param {Bot} bot
	 */
	execute(parsed, req, chat, bot) {
		switch (parsed.id) {
			case 'change_language':
				const newLang = parsed.data.language

				/// START OF STUPID CODE SECTION ///
				// Recalculate the name of the language changed to in the current language
				// this is needed because the original translation step happens in the parser before the language change
				const languageTranslations = dictionaryGet(
					'types.languages',
					newLang.id
				)
				const newLangIdInObject = getIdentifierInObject(
					newLang.text,
					dictionaryGet('types.languages', newLang.language)
				)
				const newLangName = languageTranslations
					? languageTranslations[newLangIdInObject]
					: newLang.text
				/// END OF STUPID CODE SECTION (hopefully) ///

				chat.language = newLang.id
				bot.respond(req, chat, parsed, {
					byID: 'language.language_changed_to',
					params: {
						language: newLangName,
					},
				})
				break
			case 'reply_in_message_language':
				break
		}
	}
}
