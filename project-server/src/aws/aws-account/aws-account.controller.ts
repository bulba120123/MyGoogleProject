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

@Controller('aws-account')
export class AwsAccountController {
  constructor(private readonly awsAccountService: AwsAccountService) {}

  @Post()
  create(@Body() createAwsAccountDto: Partial<AwsAccount>) {
    return this.awsAccountService.create(createAwsAccountDto);
  }

  @Get()
  findAll() {
    return this.awsAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awsAccountService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAwsAccountDto: Partial<AwsAccount>,
  ) {
    return this.awsAccountService.update(+id, updateAwsAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awsAccountService.remove(+id);
  }
}
