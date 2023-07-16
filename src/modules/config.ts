import { Storage } from './storage';
import type { CommonConfig } from '../types/common/common-config';

export const config: CommonConfig = {
	storage: new Storage(),
	prefixApi: '/api',
	plugins: [],
	lock () {
		Object.freeze(this)
	},
	set (newConfig) {
		const entries = Object.entries(newConfig);
		entries.forEach(([ k, v ]: any[]) => config[k as keyof Omit<CommonConfig, 'lock' | 'set'>] = v);
		return this.lock();
	},
};