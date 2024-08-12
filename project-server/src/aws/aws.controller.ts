import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AwsService } from './aws.service';
import { CreateEc2Dto } from './dto/create-ec2.dto';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('create-ec2')
  async createEc2Instance(@Body() createEc2Dto: CreateEc2Dto) {
    if (!createEc2Dto.accountId || !createEc2Dto.accountPassword) {
      throw new BadRequestException('Account ID and password are required');
    }

    const instanceId = await this.awsService.createEc2Instance(createEc2Dto);
    return { instanceId };
  }
}
