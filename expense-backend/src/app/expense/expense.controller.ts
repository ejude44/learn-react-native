import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './models/create-expense.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller()
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('store')
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.expenseService.create(createExpenseDto, req.user.userId);
  }

  @Get('expenses')
  findAll(@Request() req: AuthenticatedRequest) {
    return this.expenseService.findAll(req.user.userId);
  }

  @Put('expenses/:id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: CreateExpenseDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.expenseService.update(id, updateExpenseDto, req.user.userId);
  }

  @Delete('expenses/:id')
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.expenseService.remove(id, req.user.userId);
  }
}
