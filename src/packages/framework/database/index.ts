import { env } from '@naya/util/constants';
import { PrismaClient } from '@prisma/client';

export class Database {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({
            datasources: { db: { url: env.get('DATABASE_URL') } },
        });
    }

    async connect() {
        await this.prisma.$connect();
    }

    async init() {
        await this.connect();
    }

    async deInit() {
        await this.disconnect();
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}
