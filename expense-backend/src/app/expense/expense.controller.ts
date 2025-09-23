import { Controller } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller()
export class ExpenseController {
  constructor(private readonly appService: ExpenseService) {}
}
