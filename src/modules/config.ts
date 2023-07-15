import { Storage } from './storage';
import type { CommonConfig } from '../types/common/common-config';

export const config: CommonConfig = {
	storage: new Storage(),
	prefixApi: '/api',
	plugins: [],
	lockConfig () {
		Object.freeze(this)
	},
	set (newConfig) {
		const entries = Object.entries(newConfig);
		entries.forEach(([ k, v ]: any[]) => config[k as keyof Omit<CommonConfig, 'lockConfig' | 'set'>] = v);
		return this.lockConfig();
	},
};