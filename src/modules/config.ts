import { Storage } from './storage';
import type { CommonConfig } from '../types/common/common-config';

export const config: CommonConfig = {
	storage: new Storage(),
	// plugins: [],
	prefixApi: '/api',
};