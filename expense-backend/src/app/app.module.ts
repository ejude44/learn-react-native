import { Module } from '@nestjs/common';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseService } from './expense/expense.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService],
})
export class AppModule {}
