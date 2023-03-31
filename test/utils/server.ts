import express from 'express';
import { AttachController } from '../../src';

export default function startHttpServer (controllers: any[])
{
	const app = express();
	const randomPort = () => +Math.round(Date.now() * Math.random()).toString().split('').reverse().splice(0, 4).join('');

	AttachController(app, controllers);

	return {
		server: app.listen(randomPort()),
		app,
	};
}