import express from 'express';
import { AttachControllers } from '../../src';

export function createApp (controllers: any[])
{
	const app = express();
	AttachControllers(app, controllers);
	return app;
}