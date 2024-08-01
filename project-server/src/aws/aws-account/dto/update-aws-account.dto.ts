import { PartialType } from '@nestjs/mapped-types';
import { CreateAwsAccountDto } from './create-aws-account.dto';

export class UpdateAwsAccountDto extends PartialType(CreateAwsAccountDto) {}
