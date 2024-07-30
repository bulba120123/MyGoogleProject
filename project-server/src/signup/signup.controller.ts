import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(): Promise<string> {
    return this.signupService.signup();
  }
}
