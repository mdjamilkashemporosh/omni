import type { Config } from '../types/config';
import { requireEnv } from '../utils/requireEnv';

export const config: Config = {
    baseUrl: requireEnv('BASE_URL'),
    model: requireEnv('MODEL'),
    port: parseInt(process.env.PORT ?? '8000', 10)
};
