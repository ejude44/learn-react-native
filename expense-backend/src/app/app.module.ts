import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ExpenseModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
