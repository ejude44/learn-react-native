// src/app/expense/expense.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExpenseDto } from './models/create-expense.model';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    const expense = await this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        userId,
      },
    });
    return expense;
  }

  async findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateExpenseDto: CreateExpenseDto, userId: string) {
    // Check if expense exists and belongs to user
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: string, userId: string) {
    // Check if expense exists and belongs to user
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.prisma.expense.delete({
      where: { id },
    });

    return { deleted: true };
  }
}
