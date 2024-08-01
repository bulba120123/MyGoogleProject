import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateAccountDto {
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  password?: string;
}