import express              from 'express';
import { AttachController } from '../../src';

export default function startHttpServer (controllers: any[])
{
	const app = express();

	AttachController(app, controllers);

	return {
		server : app.listen(8080),
		app,
	};
}