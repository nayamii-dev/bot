import { clientOptions } from '@naya/util/constants';
import { PrismaClient } from '@prisma/client';
import { Client } from 'discord.js';


export class Nayami extends Client {

    prisma: PrismaClient;


    constructor(prisma: PrismaClient) {
        super(clientOptions);
        this.prisma = prisma;

    }
}
