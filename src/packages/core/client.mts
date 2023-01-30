import { PrismaClient } from '@prisma/client';
import { Client } from 'discord.js';

export class NayamiClient extends Client {
    prisma = new PrismaClient();
}
