import express from 'express';
import { AttachControllers } from '../../src';

export default function createApp (controllers: any[])
{
	const app = express();
	AttachControllers(app, controllers);
	return app;
}