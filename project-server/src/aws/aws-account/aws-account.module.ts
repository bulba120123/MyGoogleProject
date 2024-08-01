import { Module } from '@nestjs/common';
import { AwsAccountService } from './aws-account.service';
import { AwsAccountController } from './aws-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsAccount } from './entities/aws-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AwsAccount])],
  controllers: [AwsAccountController],
  providers: [AwsAccountService],
})
export class AwsAccountModule {}
