import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountManagementDto } from './dto/update-account.dto';
import { Account } from './entities/account-management.entity';

@Controller('account-management')
export class AccountManagementController {
  constructor(
    private readonly accountManagementService: AccountManagementService,
  ) {}

  @Get()
  findAll(): Promise<Account[]> {
    return this.accountManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Account> {
    return this.accountManagementService.findOne(id);
  }

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    const account: Account = {
      ...createAccountDto,
      id: undefined,
      userId: '',
      email: '',
    };
    return this.accountManagementService.create(account);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() account: Account): Promise<Account> {
    return this.accountManagementService.update(id, account);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.accountManagementService.remove(id);
  }

  @Patch(':id/reserve')
  reserve(@Param('id') id: number): Promise<Account> {
    return this.accountManagementService.reserve(id);
  }
}
