import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { AwsAccountModule } from './aws-account/aws-account.module';

@Module({
  controllers: [AwsController],
  providers: [AwsService],
  imports: [AwsAccountModule],
})
export class AwsModule {}
