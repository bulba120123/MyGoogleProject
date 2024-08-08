import { PartialType } from '@nestjs/mapped-types';
import { CreateAwsAccountDto } from './create-aws-account.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAwsAccountDto extends PartialType(CreateAwsAccountDto) {
  @IsOptional()
  @IsString()
  accountPassword?: string;

  @IsOptional()
  @IsString()
  accountName?: string;
}
