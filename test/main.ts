import express                                    from 'express';
import { Controller, Get, Api, attachController } from '../src/main';
import type { Request, Response }                 from '../src/main';

@Controller('/print')
class PrintController
{
	private _censoredWords: string[] = [];

	/**
	 * Return the transmitted text in uppercase.
	 * @query __text__ - User text.
	 **/
	@Get('/uppercase/')
	public async uppercaseWord (req: Request, res: Response): Promise<void>
	{
		const text       = req.query.text as string;
		const resultText = text ? this._censoredText(text) : 'You need to enter the text for the transformation.';

		// Send result:
		res.send(resultText.toUpperCase());
	}

	/**
	 * Return the passed word text lowercase.
	 * @query __text__ - User text.
	 **/
	@Get('/lowercase/')
	public async lowercaseWord (req: Request, res: Response): Promise<void>
	{
		const text       = req.query.text as string;
		const resultText = text ? this._censoredText(text) : 'You need to enter the text for the transformation.';

		// Send result:
		res.send(resultText.toLowerCase());
	}

	/**
	 * @API
	 * Add a forbidden word.
	 * @query __word__ - the word that needs to be resolved.
	 **/
	@Api()
	@Get('/censor/add/')
	public async addCensorWord (req: Request, res: Response): Promise<void>
	{
		const word = req.query.word as string;

		if (word)
		{
			this._censoredWords.push(word.toLowerCase());
			res.send(`The word «${word}» has been added to the banned list.`);
		}
		else
		{
			res.send('It is necessary to enter the word that needs to be banned!');
		}
	}

	/**
	 * @API
	 * Delete a forbidden word.
	 * @query __word__ - the word that needs to be resolved.
	 **/
	@Api()
	@Get('/censor/remove/')
	public async removeCensorWord (req: Request, res: Response): Promise<void>
	{
		const word = req.query.word as string;

		if (word)
		{
			const wordIndex = this._censoredWords.findIndex((targetWord) => targetWord === word.toLowerCase());

			if (wordIndex !== undefined)
			{
				this._censoredWords = this._censoredWords.splice(wordIndex, 1);
				res.send(`The word «${word}» has been removed from the prohibited list.`);
			}
			else
			{
				res.send(`The word «${word}» was not found in the prohibited list.`);
			}
		}
		else
		{
			res.send('It is necessary to enter the word that needs to be banned!');
		}
	}

	/**
	 * Handler masking forbidden words.
	 */
	private _censoredText (text: string): string
	{
		if (this._censoredWords.length)
		{
			return this._censoredWords.reduce((currentText, censoredWord) =>
				currentText.replaceAll(censoredWord, (target) => '█'.repeat(target.length)),
				text.toLowerCase(),
			);
		}
		else
		{
			return text;
		}
	}
}

const app = express();
attachController(app, [ PrintController ]);
app.listen(8080);