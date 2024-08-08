import { IsBoolean } from 'class-validator';

export class ActivateAwsAccountDto {
  @IsBoolean()
  isActive: boolean;
}
