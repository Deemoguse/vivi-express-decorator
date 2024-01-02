import express from 'express';
import request from 'supertest';
import { $ } from './index';

export function createApp (controllers: any[])
{
	const app = express();
	$.AttachControllers(app, controllers);
	return request(app);
}