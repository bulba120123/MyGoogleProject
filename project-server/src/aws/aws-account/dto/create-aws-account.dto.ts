import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateAwsAccountDto {
  @IsString()
  accountId: string;

  @IsString()
  accountPassword: string;

  @IsString()
  accountName: string;
}
