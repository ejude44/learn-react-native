import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async getAllExpenses() {
    return this.prisma.expense.findMany();
  }

  async createExpense(data: any) {
    return this.prisma.expense.create({ data });
  }
}
