import { env } from '@naya/env';


const ENABLED = ['xterm-256color', 'truecolor'].includes(env.get('COLORTERM')!);
ENABLED;
