import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateEc2Dto {
  @IsString()
  accountId: string;

  @IsString()
  accountPassword: string;
}
