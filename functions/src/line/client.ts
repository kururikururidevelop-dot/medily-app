import { Client, MiddlewareConfig, ClientConfig } from '@line/bot-sdk';
import * as path from 'path';

// Load environment variables
const envLocalPath = path.join(__dirname, '../../.env.local');
const envPath = path.join(__dirname, '../../.env');

// First load .env.local (if exists) -> Sets process.env vars
if (require('fs').existsSync(envLocalPath)) {
    require('dotenv').config({ path: envLocalPath });
}
// Then load .env -> Only sets vars that aren't already set
require('dotenv').config({ path: envPath });

const config: ClientConfig = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

export const lineClient = new Client(config);
export const lineConfig = config as MiddlewareConfig;
