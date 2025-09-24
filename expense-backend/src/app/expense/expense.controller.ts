import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './models/create-expense.model';

@Controller()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('store')
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get('expenses')
  findAll() {
    return this.expenseService.findAll();
  }

  @Put('expenses/:id')
  update(@Param('id') id: string, @Body() updateExpenseDto: CreateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete('expenses/:id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
