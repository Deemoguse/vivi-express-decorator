import express              from 'express';
import { AttachController } from '../../src';

let port = 8079;

export default function startHttpServer (controllers: any[])
{
	port++;

	const app = express();

	AttachController(app, controllers);

	return {
		server : app.listen(port),
		app,
	};
}