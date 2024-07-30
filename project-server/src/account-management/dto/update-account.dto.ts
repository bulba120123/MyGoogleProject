import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountManagementDto extends PartialType(CreateAccountDto) {}
