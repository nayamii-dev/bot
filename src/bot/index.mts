import { EnvManager } from '@naya/env/index.mjs';

const env = new EnvManager<{
    DISCORD_TOKEN: string;
    NODE_ENV: 'dev' | 'prod';
    CLIENT_ID: string;
}>()
    .setDefaults({
        CLIENT_ID: '',
        NODE_ENV: 'dev',
    })
    .file('./.config/.env')
    .required(['DISCORD_TOKEN']);
