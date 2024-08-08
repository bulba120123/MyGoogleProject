import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AwsAccountService } from './aws-account.service';
import { AwsAccount } from './entities/aws-account.entity';
import { CreateAwsAccountDto } from './dto/create-aws-account.dto';
import { UpdateAwsAccountDto } from './dto/update-aws-account.dto';
import { ActivateAwsAccountDto } from './dto/active-aws-account.dto';

@Controller('aws-account')
export class AwsAccountController {
  constructor(private readonly awsAccountService: AwsAccountService) {}

  @Post()
  async create(
    @Body() createAwsAccountDto: CreateAwsAccountDto,
  ): Promise<AwsAccount> {
    return this.awsAccountService.create(createAwsAccountDto);
  }

  @Get()
  findAll() {
    return this.awsAccountService.findAll();
  }

  @Get(':id/id')
  findOneById(@Param('id') id: string) {
    return this.awsAccountService.findOneById(+id);
  }

  @Get(':id/account-id')
  findOneByAccountId(@Param('account-id') accountId: string) {
    return this.awsAccountService.findOneByAccountId(accountId);
  }

  @Patch(':accountId')
  update(
    @Param('accountId') accountId: string,
    @Body() updateAwsAccountDto: UpdateAwsAccountDto,
  ) {
    return this.awsAccountService.update(accountId, updateAwsAccountDto);
  }

  @Patch(':accountId/activate')
  activate(
    @Param('accountId') accountId: string,
    @Body() activateAwsAccountDto: ActivateAwsAccountDto,
  ) {
    return this.awsAccountService.activate(accountId, activateAwsAccountDto);
  }

  @Delete(':accountId')
  remove(@Param('accountId') accountId: string) {
    return this.awsAccountService.remove(accountId);
  }
}
