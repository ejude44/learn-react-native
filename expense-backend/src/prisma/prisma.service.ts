import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 10000),
      );
      await Promise.race([this.$connect(), timeout]);
      console.log('Connected to the database');
    } catch (error) {
      console.log('Database connection failed:', error.message);
    }
  }
}
